/**
 * @author Brian Riley
 * @date November 5, 2014
 * @description
 *
 * This file sets up the configuration function for the Login Page
 * Module. Currently, the only thing the config function is responsible
 * for is adding the modules states to the route provider.
 *
 */
( function () {
    "use strict";

    var dependencies = [];

    define( "login/LoginConfig", dependencies, function () {

        /**
         * @description Constructor function for the config.
         * @ngdoc method
         * @name app.login:LoginConfig#config
         * @methodOf app.login:LoginConfig
         * @constructor
         */
        var LoginConfig = function ( $stateProvider ) {
            $stateProvider
                .state( "login", {
                    url: "/login",
                    templateUrl: "login/view/Login",
                    controller: "loginController",
                    pageTitle: "login.title"
                } );
        };

        /**
         * Publish constructor array.
         */
        return [ "$stateProvider", LoginConfig ];
    } );
}() );
