/**
 * @docType module
 * @docType app
 * @name app.home:HomeConfig
 * @author Kile Salmon
 * @date July 31, 2014
 * @copyright 2014 Putnam Inc.
 * @description
 *
 * This file sets up the configuration function for the Home Page
 * Module. Currently, the only thing the config function is responsible
 * for is adding the modules states to the route provider.
 *
 * @author Kile Salmon
 *
 */
( function () {
    "use strict";

    var dependencies = [];

    define( "home/HomeConfig", dependencies, function () {

        /**
         * @description Constructor function for the config.
         * @ngdoc method
         * @name app.home:HomeConfig#config
         * @methodOf app.home:HomeConfig
         * @constructor
         */
        var HomeConfig = function ( $stateProvider ) {
            $stateProvider
                .state( "home", {
                    url: "/home",
                    templateUrl: "home/view/Home",
                    controller: "homeController",
                    pageTitle: "home.title"
                } );
        };

        /**
         * Publish constructor array.
         */
        return [ "$stateProvider", HomeConfig ];
    } );
}() );
