/**
 * @docType module
 * @docType app
 * @name app.home:LoaderModule
 * @author Brian Riley
 * @date July 24, 2014
 * @copyright 2014 Putnam Inc.
 * @description
 *
 *      Module definition for Route section.
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

        var rootScope;
        var q;

        /**
         * Instantiate the module with it's child module dependencies and IoC objects.
         */
        angular.module( moduleName, moduleDependencies )
            .config( [ "$controllerProvider", "$provide", "$compileProvider", "$filterProvider", "$injector", "$animateProvider",
                function ( $controllerProvider, $provide, $compileProvider, $filterProvider, $injector, $animateProvider ) {

                    // Substitute provider methods and cache them on angular.asyncModule
                    angular.extend( angular, {
                        asyncModule : {
                            provider: function ( name, constructor ) {
                                logger.debug( "angular.provider( Registering `{0}` )" , [name]);
                                $provide.provider( name, constructor );
                                return this;
                            },
                            controller: function ( name, constructor ) {
                                logger.debug( "angular.controller( Registering `{0}` )" , [name]);
                                $controllerProvider.register( name, constructor );
                                return this;
                            },
                            directive: function ( name, constructor ) {
                                logger.debug( "angular.directive( Registering `{0}` )" , [name]);
                                $compileProvider.directive( name, constructor );
                                return this;
                            },
                            filter: function ( name, constructor ) {
                                logger.debug( "angular.filter( Registering `{0}` )" , [name]);
                                $filterProvider.register( name, constructor );
                                return this;
                            },
                            factory: function ( name, constructor ) {
                                logger.debug( "angular.factory( Registering `{0}` )" , [name]);
                                $provide.factory( name, constructor );
                                return this;
                            },
                            service: function ( name, constructor ) {
                                logger.debug( "angular.service( Registering `{0}` )" , [name]);
                                $provide.service( name, constructor );
                                return this;
                            },
                            constant: function ( name, constructor ) {
                                logger.debug( "angular.constant( Registering `{0}` )" , [name]);
                                $provide.constant( name, constructor );
                                return this;
                            },
                            value: function ( name, constructor ) {
                                logger.debug( "angular.value( Registering `{0}` )" , [name]);
                                $provide.value( name, constructor );
                                return this;
                            },
                            animation: angular.bind( $animateProvider, $animateProvider.register )
                            //load: ["$q", "$rootScope", function ($q, $rootScope) {
                            //
                            //    var defer = $q.defer();
                            //
                            //    // the data property is part of the state object defined below
                            //    var module = this.data;
                            //
                            //    if(angular.isUndefined(module) || (module === null) || (module === "")) {
                            //        throw new Error("An async module cannot be undefined, null, or an empty string. Trying to load the " +
                            //        "async module with name = " + module);
                            //    }
                            //
                            //    logger.debug( "loadModule( {0} )", [module] );
                            //
                            //    //require( [ "home/HomeModule" ], function ( module ) {
                            //    require( [ module ], function ( module ) {
                            //        defer.resolve();
                            //        $rootScope.$apply();
                            //    } );
                            //
                            //    return defer.promise;
                            //}]
                        }
                    } );

                }
            ] );
            //.run(["$rootScope", "$q"], function($rootScope, $q) {
            //    rootScope = $rootScope;
            //    q = $q;
            //
            //    angular.extend( angular.asyncModule, {
            //        load: function ($q, $rootScope) {
            //
            //            var defer = $q.defer();
            //
            //            // the data property is part of the state object defined below
            //            var module = this.data;
            //
            //            if(angular.isUndefined(module) || (module === null) || (module === "")) {
            //                throw new Error("An async module cannot be undefined, null, or an empty string. Trying to load the " +
            //                "async module with name = " + module);
            //            }
            //
            //            logger.debug( "loadModule( {0} )", [module] );
            //
            //            //require( [ "home/HomeModule" ], function ( module ) {
            //            require( [ module ], function ( module ) {
            //                defer.resolve();
            //                $rootScope.$apply();
            //            } );
            //
            //            return defer.promise;
            //        }
            //    } );
            //});

        // Publish the module namespace; used as dependency name within other
        // angular.module( <moduleName>, [ <depNameSpace> ] );
        return moduleName;
    } );
}() );
