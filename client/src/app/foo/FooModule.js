/**
 * @author Brian Riley
 * @date November 5, 2014
 * @description
 *
 *      Module definition for Foo section.
 */
( function () {
    "use strict";

    // RequireJS dependencies
    var dependencies = [
        "foo/view/FooController"
    ];

    /**
     * Register the module with RequireJS.
     */
    define( "foo/FooModule", dependencies, function () {

        var FooController = require( "foo/view/FooController" );

        var moduleName = "FooModule";
        var moduleDependencies = [];

        /**
         * Instantiate the module with it's child module dependencies and IoC objects.
         */
        angular.module( moduleName, moduleDependencies )
            .controller( "fooController", FooController );

        // Publish the module namespace; used as dependency name within other
        // angular.module( <moduleName>, [ <depNameSpace> ] );
        return moduleName;
    } );
}() );
