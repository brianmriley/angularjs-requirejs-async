/**
 * @author Brian Riley
 * @date November 5, 2014
 * @description
 *
 *      Module definition for Bar section.
 */
( function () {
    "use strict";

    // RequireJS dependencies
    var dependencies = [
        "bar/view/BarController"
    ];

    /**
     * Register the module with RequireJS.
     */
    define( "bar/BarModule", dependencies, function () {

        var BarController = require( "bar/view/BarController" );

        var moduleName = "BarModule";
        var moduleDependencies = [];

        /**
         * Instantiate the module with it's child module dependencies and IoC objects.
         */
        angular.asyncModule( moduleName, moduleDependencies )
            .controller( "barController", BarController );

        // Publish the module namespace; used as dependency name within other
        // angular.module( <moduleName>, [ <depNameSpace> ] );
        return moduleName;
    } );
}() );
