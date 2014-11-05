/**
 * @docType module
 * @docType app
 * @name app.home:RoutesModule
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
        //"home/RouteConfig"
        "infrastructure/logger/ExternalLogger"
    ];

    /**
     * Register the module with RequireJS.
     */
    define( "infrastructure/RoutesModule", dependencies, function () {

        //var RouteConfig = require( "home/RouteConfig" );
        var ExternalLogger = require( "infrastructure/logger/ExternalLogger" );
        var logger = ExternalLogger.getInstance( "RoutesModule" );

        var injector = {};

        var moduleName = "RoutesModule";
        var moduleDependencies = [];

        var resolve = {

            //load: angular.asyncModule.load
            load: ["$q", "$rootScope", function ($q, $rootScope) {

                var defer = $q.defer();

                // the data property is part of the state object defined below
                var module = this.data;

                if(angular.isUndefined(module) || (module === null) || (module === "")) {
                    throw new Error("An async module cannot be undefined, null, or an empty string. Trying to load the " +
                    "async module with name = " + module);
                }

                logger.debug( "loadModule( {0} )", [module] );

                //require( [ "home/HomeModule" ], function ( module ) {
                require( [ module ], function ( module ) {
                    defer.resolve();
                    $rootScope.$apply();
                } );

                return defer.promise;
            }]
        };

        /**
         * Instantiate the module with it's child module dependencies and IoC objects.
         */
        angular.module( moduleName, moduleDependencies )

            // TODO: BMR: Do we need this? It was exploratory when first trying to register services after bootstrapping...
            .config( [ "$injector",
                    function ( $injector ) {
                        injector = $injector;
                    }
                ] )
            .config( [ "$stateProvider",
                function ( $stateProvider ) {

                    $stateProvider

                        // DEFAULT
                        .state( "default", {
                            url: "",
                            templateUrl: "login/view/LoginView",
                            controller: "loginController",
                            pageTitle: "login.title"
                        } )

                        // LOGIN
                        .state( "login", {
                            url: "/login",
                            templateUrl: "login/view/LoginView",
                            controller: "loginController",
                            pageTitle: "login.title"
                        } )

                        // HOME
                        .state( "home", {
                            url: "/home",
                            templateUrl: "home/view/HomeView",
                            controller: "homeController",
                            pageTitle: "home.title",
                            data: "home/HomeModule",
                            resolve: resolve
                            //resolve: {
                            //    load: angular.asyncModule.load
                            //}

                        } );

                }
            ] );

        // Publish the module namespace; used as dependency name within other
        // angular.module( <moduleName>, [ <depNameSpace> ] );
        return moduleName;
    } );
}() );
