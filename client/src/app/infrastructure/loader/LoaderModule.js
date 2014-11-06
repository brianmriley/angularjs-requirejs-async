/**
 * @author Brian Riley
 * @date November 5, 2014
 * @description
 *
 *      Module definition that provides RequireJS asynchronous loading of AngularJS Modules by extending angular with
 *      a new function called `asyncModule`. The usage is identical to that of angular.module(), but obviously allows
 *      the loading of AJS modules dynamically. It also allows for runtime AJS service registration; this list of
 *      runtime registrations includes:
 *
 *          * controller
 *          * directive
 *          * service
 *          * factory
 *          * provider
 *          * constant
 *          * value
 *          * filter
 *          * animation
 *
 *      NOTE: The async loaded modules currently don't allow for the use of the config() or run() methods typically
 *      found on the angular.module() and are considered a WIP.
 */
( function () {
    "use strict";

    // RequireJS dependencies
    var dependencies = [
        "infrastructure/logger/ExternalLogger"
    ];

    /**
     * Register the module with RequireJS.
     */
    define( "infrastructure/loader/LoaderModule", dependencies, function () {

        var ExternalLogger = require( "infrastructure/logger/ExternalLogger" );
        var logger = ExternalLogger.getInstance( "LoaderModule" );

        var moduleName = "LoaderModule";
        var moduleDependencies = [];

        var injector;
        var providerCache;

        var moduleLoader = {
            name: "",
            dependencies: []
        };

        /**
         * Instantiate the module with it's child module dependencies and IoC objects.
         */
        angular.module( moduleName, moduleDependencies )
            .config( [ "$controllerProvider", "$provide", "$compileProvider", "$filterProvider", "$animateProvider",
                function ( $controllerProvider, $provide, $compileProvider, $filterProvider, $animateProvider ) {

                    providerCache = {
                        $controllerProvider: $controllerProvider,
                        $provide: $provide,
                        $compileProvider: $compileProvider,
                        $filterProvider: $filterProvider,
                        $animateProvider: $animateProvider
                    };

                    // Substitute provider methods and cache them for later use so we can register services after
                    // bootstrapping or when asynchronously loading modules using RequireJS
                    angular.extend( moduleLoader, {
                        provider: function ( name, constructor ) {
                            logger.debug( "angular.provider( Registering `{0}` )", [ name ] );
                            providerCache[name + "Provider"] = $provide.provider( name, constructor );
                            return this;
                        },
                        controller: function ( name, constructor ) {
                            logger.debug( "angular.controller( Registering `{0}` )", [ name ] );
                            $controllerProvider.register( name, constructor );
                            return this;
                        },
                        directive: function ( name, constructor ) {
                            logger.debug( "angular.directive( Registering `{0}` )", [ name ] );
                            $compileProvider.directive( name, constructor );
                            return this;
                        },
                        filter: function ( name, constructor ) {
                            logger.debug( "angular.filter( Registering `{0}` )", [ name ] );
                            $filterProvider.register( name, constructor );
                            return this;
                        },
                        factory: function ( name, constructor ) {
                            logger.debug( "angular.factory( Registering `{0}` )", [ name ] );
                            $provide.factory( name, constructor );
                            return this;
                        },
                        service: function ( name, constructor ) {
                            logger.debug( "angular.service( Registering `{0}` )", [ name ] );
                            $provide.service( name, constructor );
                            return this;
                        },
                        constant: function ( name, constructor ) {
                            logger.debug( "angular.constant( Registering `{0}` )", [ name ] );
                            $provide.constant( name, constructor );
                            return this;
                        },
                        value: function ( name, constructor ) {
                            logger.debug( "angular.value( Registering `{0}` )", [ name ] );
                            $provide.value( name, constructor );
                            return this;
                        },
                        animation: angular.bind( $animateProvider, $animateProvider.register )
                    } );

                }
            ] )
            .run( [ "$rootScope", "$q", "$injector", function ( $rootScope, $q, $injector ) {

                // save a reference to the injector
                injector = $injector;

                // add the load function that actually uses RJS to load modules
                // TODO: BMR: Consider caching the module so it's not loaded or created again
                angular.extend( moduleLoader, {

                    /**
                     * Performs the actual async module load using RJS. Call scope.apply() to ensure AJS is aware
                     * of this as RJS actions are outside the scope of AJS's context.
                     *
                     * @param moduleName
                     * @returns {Deferred.promise|*}
                     */
                    load: function ( moduleName ) {

                        var defer = $q.defer();

                        if ( angular.isUndefined( moduleName ) || ( moduleName === null ) || ( moduleName === "" ) ) {
                            throw new Error(
                                "An async module cannot be undefined, null, or an empty string. Trying to load the " +
                                "async module with name = " + moduleName + " failed." );
                        }

                        logger.debug( "loadModule( {0} )", [ moduleName ] );

                        // Use RequireJS to load the module at runtime. The module parameter is not used, but is a
                        // reference to the module name as that's what each module returns
                        require( [ moduleName ], function ( module ) {
                            defer.resolve();

                            // since RJS function executions are outside the scope of AJS, let's let AJS know we did
                            // something -- this forces the digest cycle to run since AJS has no idea a module
                            // was just loaded
                            $rootScope.$apply();
                        } );

                        return defer.promise;
                    },

                    /**
                     * Hook for angular.module().config() method. Basically uses an instance of the AJS injector to
                     * process any dependencies just like the framework does internally.
                     *
                     * @param fn
                     */
                    config: function(fn) {
                        console.log(arguments);
                        injector.invoke(fn || angular.noop);
                    },

                    /**
                     * Hook for angular.module().run() method. Uses an instance of the AJS injector to
                     * process any dependencies just like the framework does internally and "injects" them
                     * into the run function.
                     *
                     * @param fn
                     */
                    run: function(fn) {
                        injector.invoke(fn || angular.noop);
                    },

                    providerCache: providerCache,
                    injector: injector
                } );

                // Finally create the same angular.module() syntax for our new asynchronous module returning the
                // newly created module
                angular.extend( angular, {
                    asyncModule: function ( name, dependencies ) {
                        if ( angular.isDefined( name ) ) {
                            logger.debug( "createModule( {0}, {1} )", [ name, dependencies ] );
                        }
                        moduleLoader.name = name;
                        moduleLoader.dependencies = dependencies;
                        return moduleLoader;
                    }
                } );

            } ] );

        // Publish the module namespace; used as dependency name within other
        // angular.module( <moduleName>, [ <depNameSpace> ] );
        return moduleName;
    } );
}() );
