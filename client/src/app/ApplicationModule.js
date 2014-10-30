/**
 * @docType module
 * @docType app
 * @name app.Modules:ApplicationModule
 * @author Brian Riley
 * @date July 24, 2014
 * @copyright 2014 Putnam Inc.
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
        //"infrastructure/route/RouteModule",
        // generated at build time so won't actually be in the source infrastructure dir
        "infrastructure/HTMLTemplateModule",

        // Application Modules
        "home/HomeModule"
    ];

    /**
     * Register the module with RequireJS.
     */
    define( "ApplicationModule", dependencies, function () {

        // Infrastructure Modules
        var LogDecorator = require( "infrastructure/logger/LogDecorator" );
        var HTMLTemplateModule = require( "infrastructure/HTMLTemplateModule" );
        var LocalizationModule = require( "infrastructure/LocalizationModule" );
        //var RouteModule = require( "infrastructure/route/RouteModule" );

        // View Modules
        var HomeModule = require( "home/HomeModule" );

        var moduleName = "ApplicationModule";
        var moduleDependencies = [
            "ui.router",
            //"ui.odometer",
            //"ngAnimate",
            "ngSanitize",
            "angularModalService",
            "angularSpinner",
            HTMLTemplateModule,
            LocalizationModule,
            //RouteModule,
            HomeModule
        ];

        /**
         * Register and initialize the Application module. Notice the run() method that initializes the application.
         */
        angular.module( moduleName, moduleDependencies )
            .config( LogDecorator );

        return moduleName;
    } );

}() );