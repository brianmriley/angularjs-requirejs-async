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
    ];

    /**
     * Register the module with RequireJS.
     */
    define( "infrastructure/RoutesModule", dependencies, function () {

        //var RouteConfig = require( "home/RouteConfig" );

        var moduleName = "RoutesModule";
        var moduleDependencies = [];

        /**
         * Instantiate the module with it's child module dependencies and IoC objects.
         */
        angular.module( moduleName, moduleDependencies )
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
                        pageTitle: "home.title"
                    } );

                }
            ] );

        // Publish the module namespace; used as dependency name within other
        // angular.module( <moduleName>, [ <depNameSpace> ] );
        return moduleName;
    } );
}() );
