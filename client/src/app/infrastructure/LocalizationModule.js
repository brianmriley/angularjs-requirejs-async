/**
 * @docType module
 * @ngDoc app
 * @name app.Modules:LocalizationModule
 * @author Brian Riley
 * @date July 24, 2014
 * @copyright 2014 Putnam Inc.
 * @description
 *
 *      Defines some locales for the application like English and Spanish. The actual JSON localization resource bundles are loaded into the
 *      LocalesModule and defined as an AngularJS Service Constant value so it's available to the $translateProvider at config() -- normal
 *      AJS services are not available to the config() of a module.
 *
 */
( function () {
    "use strict";

    // RequireJS dependencies
    var dependencies = [
        "infrastructure/LocalesModule"
    ];

    /**
     * Register the module with RequireJS.
     *
     * In order for builds to work correctly, it's important to always include a unique ID for the RequireJS Module that matches the
     * path for the module.
     */
    define( "infrastructure/LocalizationModule", dependencies, function () {

        var moduleName = "LocalizationModule";
        var moduleDependencies = [
            "pascalprecht.translate",
            "infrastructure/LocalesModule"
        ];

        angular.module( moduleName, moduleDependencies )
            .config( [ "$translateProvider", "LOCALES",
                function ( $translateProvider, LOCALES ) {

                    $translateProvider.translations( "en_US", LOCALES.en_US );
                    $translateProvider.translations( "es_ES", LOCALES.es_ES );

                    $translateProvider.preferredLanguage( "en_US" );
                }
            ] );

        // Publish the module namespace; used as dependency name within other
        // angular.module( <moduleName>, [ <depNameSpace> ] );
        return moduleName;

    } );

}() );
