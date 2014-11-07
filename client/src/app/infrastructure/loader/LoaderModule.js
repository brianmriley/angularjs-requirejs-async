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
 *      The async module also allows for the usage of the config and run methods in the same fashion as the original
 *      angular.module().config() and angular.module().run() methods.
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

        /**
         * Reference to the config-level injector achieved by grabbing in thw angular.module.config() method. Saved
         * so it can be added to the new async module.
         */
        var configInjector;

        /**
         * Reference to the run-level injector achieved by grabbing in thw angular.module.run() method. Saved
         * so it can be added to the new async module.
         */
        var runInjector;

        /**
         * Reference to the config-level providers achieved by grabbing in thw angular.module.config() method. Saved
         * so it can be added to the new async module.
         */
        var providerCache;

        /**
         * A container for the new async module object with both the name and list of dependencies.
         *
         * @type {{name: string, dependencies: array}}
         */
        var asyncModuleInstance = {
            name: "",
            dependencies: [],
            isLoaded: false
        };

        /**
         * Instantiate the module with it's child module dependencies and IoC objects.
         */
        angular.module( moduleName, moduleDependencies )
            .config( [ "$controllerProvider", "$provide", "$compileProvider", "$filterProvider", "$animateProvider", "$injector",
                function ( $controllerProvider, $provide, $compileProvider, $filterProvider, $animateProvider, $injector ) {

                    // Cache a reference to the config injector.
                    configInjector = $injector;

                    // Cache references to the core AJS providers
                    providerCache = {
                        $controllerProvider: $controllerProvider,
                        $provide: $provide,
                        $compileProvider: $compileProvider,
                        $filterProvider: $filterProvider,
                        $animateProvider: $animateProvider
                    };

                    // Substitute provider methods and cache them for later use so we can register services after
                    // bootstrapping or when asynchronously loading modules using RequireJS
                    angular.extend( asyncModuleInstance, {

                        /**
                         * Wraps the angular.module().provider() method using the $provide injected at the
                         * configuration phase. Allows for runtime registration of a controller in an async loaded module.
                         *
                         * Also caches any custom providers created during runtime and
                         * adds them to the moduleLoader.
                         *
                         * @param name
                         * @param constructor
                         * @returns {asyncModuleInstance}
                         */
                        provider: function ( name, constructor ) {
                            logger.debug( "angular.provider( Registering `{0}` )", [ name ] );
                            providerCache[ name + "Provider" ] = $provide.provider( name, constructor );
                            return this;
                        },

                        /**
                         * Wraps the angular.module().controller() method using the $controllerProvider injected at the
                         * configuration phase. Allows for runtime registration of a controller in an async loaded module.
                         *
                         * @param name
                         * @param constructor
                         * @returns {asyncModuleInstance}
                         */
                        controller: function ( name, constructor ) {
                            logger.debug( "angular.controller( Registering `{0}` )", [ name ] );
                            $controllerProvider.register( name, constructor );
                            return this;
                        },

                        /**
                         * Wraps the angular.module().directive() method using the $compileProvider injected at the
                         * configuration phase. Allows for runtime registration of a directive in an async loaded module.
                         *
                         * @param name
                         * @param constructor
                         * @returns {asyncModuleInstance}
                         */
                        directive: function ( name, constructor ) {
                            logger.debug( "angular.directive( Registering `{0}` )", [ name ] );
                            $compileProvider.directive( name, constructor );
                            return this;
                        },

                        /**
                         * Wraps the angular.module().filter() method using the $filterProvider injected at the
                         * configuration phase. Allows for runtime registration of a filter in an async loaded module.
                         *
                         * @param name
                         * @param constructor
                         * @returns {asyncModuleInstance}
                         */
                        filter: function ( name, constructor ) {
                            logger.debug( "angular.filter( Registering `{0}` )", [ name ] );
                            $filterProvider.register( name, constructor );
                            return this;
                        },

                        /**
                         * Wraps the angular.module().factory() method using the $provide injected at the
                         * configuration phase. Allows for runtime registration of a factory in an async loaded module.
                         *
                         * @param name
                         * @param constructor
                         * @returns {asyncModuleInstance}
                         */
                        factory: function ( name, constructor ) {
                            logger.debug( "angular.factory( Registering `{0}` )", [ name ] );
                            $provide.factory( name, constructor );
                            return this;
                        },

                        /**
                         * Wraps the angular.module().service() method using the $provide injected at the
                         * configuration phase. Allows for runtime registration of a service in an async loaded module.
                         *
                         * @param name
                         * @param constructor
                         * @returns {asyncModuleInstance}
                         */
                        service: function ( name, constructor ) {
                            logger.debug( "angular.service( Registering `{0}` )", [ name ] );
                            $provide.service( name, constructor );
                            return this;
                        },

                        /**
                         * Wraps the angular.module().constant() method using the $provide injected at the
                         * configuration phase. Allows for runtime registration of a constant in an async loaded module.
                         *
                         * @param name
                         * @param constructor
                         * @returns {asyncModuleInstance}
                         */
                        constant: function ( name, constructor ) {
                            logger.debug( "angular.constant( Registering `{0}` )", [ name ] );
                            $provide.constant( name, constructor );
                            return this;
                        },

                        /**
                         * Wraps the angular.module().value() method using the $provide injected at the
                         * configuration phase. Allows for runtime registration of a value in an async loaded module.
                         *
                         * @param name
                         * @param constructor
                         * @returns {asyncModuleInstance}
                         */
                        value: function ( name, constructor ) {
                            logger.debug( "angular.value( Registering `{0}` )", [ name ] );
                            $provide.value( name, constructor );
                            return this;
                        },

                        /**
                         * Wraps the angular.module().animation() method using the $animateProvider injected at the
                         * configuration phase. Allows for runtime registration of a animation/ in an async loaded module.
                         *
                         * @param name
                         * @param constructor
                         * @returns {asyncModuleInstance}
                         */
                        animation: angular.bind( $animateProvider, $animateProvider.register )
                    } );

                }
            ] )
            .run( [ "$rootScope", "$q", "$injector", function ( $rootScope, $q, $injector ) {

                // Cache a reference to the runtime injector
                runInjector = $injector;

                // add runtime references and methods to the async module instance
                // TODO: BMR: Consider caching the module so it's not loaded or created again
                angular.extend( asyncModuleInstance, {

                    /**
                     * Hash cache of all AJS providers and any custom ones created at runtime. The cache uses the
                     * provider's name as the key and the provider as the value.
                     *
                     * Not currently used, but it is now available on the async module should the need arise.
                     */
                    providerCache: providerCache,

                    /**
                     * Hash cache of all AJS providers and any custom ones created at runtime. The cache uses the
                     * provider's name as the key and the provider as the value.
                     *
                     * Not currently used, but it is now available on the async module should the need arise.
                     */
                    configInjector: configInjector,

                    /**
                     * Hash cache of all AJS providers and any custom ones created at runtime. The cache uses the
                     * provider's name as the key and the provider as the value.
                     *
                     * Not currently used, but it is now available on the async module should the need arise.
                     */
                    runInjector: runInjector,

                    /**
                     * Hook for angular.module().config() method. Basically uses an instance of the AJS injector to
                     * process any dependencies just like the framework does internally.
                     *
                     * @param {function} fn
                     */
                    config: function ( fn ) {
                        configInjector.invoke( fn || angular.noop );
                        return this;
                    },

                    /**
                     * Hook for angular.module().run() method. Uses an instance of the AJS injector to
                     * process any dependencies just like the framework does internally and "injects" them
                     * into the run function.
                     *
                     * @param {function} fn
                     */
                    run: function ( fn ) {
                        runInjector.invoke( fn || angular.noop );
                        return this;
                    },

                    /**
                     * Performs the actual async module load using RJS. Call scope.apply() to ensure AJS is aware
                     * of this as RJS actions are outside the scope of AJS's context.
                     *
                     * @param {string} moduleName
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

                            // set a flag indicating that this module was loaded
                            //asyncModuleInstance.isLoaded = true;

                            // resolve the promise now that the module ahs been loaded
                            defer.resolve();

                            // since RJS function executions are outside the scope of AJS, let's let AJS know we did
                            // something -- this forces the digest cycle to run since AJS has no idea a module
                            // was just loaded
                            $rootScope.$apply();
                        } );

                        return defer.promise;
                    }

                } );

                // Finally create the same angular.module() syntax for our new asynchronous module returning the
                // newly created module by extending angular
                angular.extend( angular, {

                    /**
                     * Used to simulate angular.module() but for the purpose of loading AJS modules asynchronously
                     * using RJS.
                     *
                     * @param {string} name
                     * @param {Array.<string>=} dependencies
                     * @returns {{name: string, dependencies: array}}
                     */
                    asyncModule: function ( name, dependencies ) {
                        if ( angular.isDefined( name ) ) {
                            logger.debug( "createModule( {0}, {1} )", [ name, dependencies ] );
                        }
                        asyncModuleInstance.name = name;
                        asyncModuleInstance.dependencies = dependencies;
                        return asyncModuleInstance;
                    }
                } );

            } ] );

        // Publish the module namespace; used as dependency name within other
        // angular.module( <moduleName>, [ <depNameSpace> ] );
        return moduleName;
    } );
}() );
