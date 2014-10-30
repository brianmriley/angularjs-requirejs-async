/**
 * @docType module
 * @docType app
 * @name app.home:HomeModule
 * @author Brian Riley
 * @date July 24, 2014
 * @copyright 2014 Putnam Inc.
 * @description
 *
 *      Module definition for Home section.
 */
( function () {
    "use strict";

    // RequireJS dependencies
    var dependencies = [
        "home/HomeConfig",
        "home/view/HomeController"
    ];

    /**
     * Register the module with RequireJS.
     */
    define( "home/HomeModule", dependencies, function () {

        var HomeConfig = require( "home/HomeConfig" );
        var HomeController = require( "home/view/HomeController" );

        var moduleName = "HomeModule";
        var moduleDependencies = [];

        /**
         * Instantiate the module with it's child module dependencies and IoC objects.
         */
        angular.module( moduleName, moduleDependencies )
            .config( HomeConfig )
            .controller( "homeController", HomeController );

        // Publish the module namespace; used as dependency name within other
        // angular.module( <moduleName>, [ <depNameSpace> ] );
        return moduleName;
    } );
}() );
