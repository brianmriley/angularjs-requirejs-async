/**
 * @author Brian Riley
 * @date November 5, 2014
 * @description
 *
 *      Module definition for Login section.
 */
( function () {
    "use strict";

    // RequireJS dependencies
    var dependencies = [
        "login/LoginConfig",
        "login/view/LoginController"
    ];

    /**
     * Register the module with RequireJS.
     */
    define( "login/LoginModule", dependencies, function () {

        var LoginConfig = require( "login/LoginConfig" );
        var LoginController = require( "login/view/LoginController" );

        var moduleName = "LoginModule";
        var moduleDependencies = [];

        /**
         * Instantiate the module with it's child module dependencies and IoC objects.
         */
        angular.module( moduleName, moduleDependencies )
            //.config( LoginConfig )
            .controller( "loginController", LoginController );

        // Publish the module namespace; used as dependency name within other
        // angular.module( <moduleName>, [ <depNameSpace> ] );
        return moduleName;
    } );
}() );
