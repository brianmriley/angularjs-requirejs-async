/**
 * @author Brian Riley
 * @date November 5, 2014
 * @description
 *
 *      Lists all of the application dependency modules so it's all packaged into one parent module.
 *
 *      Also configures various core infrastructure decorators like logging, global HTTP response interception, and global error handling.
 *
 *      Last but not least, the application is officially initialized here by calling `initializationService.init()` which loads
 *      all the data for the app and kicks off any additional initialization configurations.
 */
( function () {
    "use strict";

    // RequireJS dependencies
    var dependencies = [

        // Infrastructure Modules
        "infrastructure/logger/LogDecorator",
        "infrastructure/LocalizationModule",
        "infrastructure/RoutesModule",
        // generated at build time so won't actually be in the source infrastructure dir
        "infrastructure/HTMLTemplateModule",
        "infrastructure/loader/LoaderModule",

        // Application Modules
        "login/LoginModule"
        //"home/HomeModule"
    ];

    /**
     * Register the module with RequireJS.
     */
    define( "ApplicationModule", dependencies, function () {

        // Infrastructure Modules
        var LogDecorator = require( "infrastructure/logger/LogDecorator" );
        var HTMLTemplateModule = require( "infrastructure/HTMLTemplateModule" );
        var LocalizationModule = require( "infrastructure/LocalizationModule" );
        var RoutesModule = require( "infrastructure/RoutesModule" );
        var LoaderModule = require( "infrastructure/loader/LoaderModule" );

        // View Modules
        var LoginModule = require( "login/LoginModule" );
        //var HomeModule = require( "home/HomeModule" );

        var moduleName = "ApplicationModule";
        var moduleDependencies = [

            // 3rd party modules
            "ui.router",
            //"ui.odometer",
            //"ngAnimate",
            "ngSanitize",
            "angularModalService",
            "angularSpinner",

            // infrastructure modules
            HTMLTemplateModule,
            LocalizationModule,
            RoutesModule,
            LoaderModule,

            // view modules
            LoginModule
            //HomeModule
        ];

        /**
         * Register and initialize the Application module. Notice the run() method that initializes the application.
         */
        angular.module( moduleName, moduleDependencies )
            .config( LogDecorator );

        return moduleName;
    } );

}() );
