/**
 * @author Brian Riley
 * @date July 24, 2014
 * @copyright 2014 Putnam Investments Inc.
 * @description
 *
 *      Bootstraps the application by loading all dependencies, setting up RequireJS, and bootstrapping the
 *      AngularJS application.
 *
 *      1) Load all libs
 *      2) Configure RequireJS
 *      3) Bootstrap the AngularJS App
 *
 *      NOTE:   This module is exposed as a bootstrap object so other classes have access to it and
 *              can be notified when it's ready to rock.
 *
 */
( function () {
    "use strict";

    require.config( {
        appDir: "",
        baseUrl: "",
        paths: {
            "angular": "libs/angular",
            "angular-animate": "libs/angular-animate",
            "angular-mocks": "libs/angular-mocks",
            "angular-sanitize": "libs/angular-sanitize",
            "angular-touch": "libs/angular-touch",
            "angular-translate": "libs/angular-translate",
            "angular-ui-router": "libs/angular-ui-router",
            "angular-modal-service": "libs/angular-modal-service",
            "angular-spinner": "libs/angular-spinner",
            //"angular-odometer-js": "libs/angular-odometer-js",
            "angular-cookies": "libs/angular-cookies",
            "twitter-bootstrap": "libs/js/bootstrap.min"
        },
        // disabling timeout for script loading to support slow internet connections
        waitSeconds: 0
    } );

    // RequireJS dependencies
    var dependencies = [
        "infrastructure/logger/ExternalLogger",
        "ApplicationModule"
    ];

    /**
     * Now let"s start our AngularJS app... which uses RequireJS to load the app packages and code.
     */
    require( dependencies, function () {

        var ExternalLogger = require( "infrastructure/logger/ExternalLogger" );
        var ApplicationModule = require( "ApplicationModule" );
        var logger = ExternalLogger.getInstance( "Bootstrap" );

        var moduleName = "angularjs-requirejs-async";
        var moduleDependencies = [
            ApplicationModule
        ];

        /**
         * Start the main application.
         * Manually start the bootstrap process; since ng:app directive has been removed from the index.html.
         */
        angular.module( moduleName, moduleDependencies );
        logger.debug( "angular.bootstrap( {0} )", [ moduleName ] );
        angular.bootstrap( document, [ moduleName ] );
    } );

} )();
