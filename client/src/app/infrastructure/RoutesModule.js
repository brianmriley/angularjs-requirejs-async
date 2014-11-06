/**
 * @author Brian Riley
 * @date November 5, 2014
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

        var ExternalLogger = require( "infrastructure/logger/ExternalLogger" );
        var logger = ExternalLogger.getInstance( "RoutesModule" );

        var moduleName = "RoutesModule";
        var moduleDependencies = [];

        var resolve = {

            load: function () {

                // the data property is part of the state object defined below
                var module = this.data;

                return angular.asyncModule().load( module );
            }
        };

        /**
         * Instantiate the module with it's child module dependencies and IoC objects.
         */
        angular.module( moduleName, moduleDependencies )

        .config( [ "$stateProvider", function ( $stateProvider ) {

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
            } );

        } ] );

        // Publish the module namespace; used as dependency name within other
        // angular.module( <moduleName>, [ <depNameSpace> ] );
        return moduleName;
    } );
}() );
