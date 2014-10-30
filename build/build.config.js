/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {

    /**
     * The `srcDir` folder is where our source code directory is located.
     */
    srcDir: "app",

    /**
     * The `testDir` folder is where the unit and e2e tests are located.
     */
    testDir: "test",

    /**
     * The `libDir` folder is where the 3rd party JS libraries are located.
     */
    libDir: "libs",

    /**
     * The `hubDir` folder is where the hub library is located.
     */
    hubDir: "hub",

    /**
     * The `buildDir` folder is where our projects are compiled during development.
     * TODO: BMR: Consider using bin/dev
     */
    buildDir: "server/dev",

    /**
     * The `compileDir` folder is where our app resides once it's completely built and is ready for production.
     * TODO: BMR: Consider using bin/prod
     */
    compileDir: "server/prod",

    /**
     * List of 3rd party libraries required for the application.
     */
    libs: {
        dev: [
            "libs/lodash/dist/lodash.compat.js",
            "libs/jquery/dist/jquery.js",
            "libs/spin.js/spin.js",
            "libs/angular/angular.js",
            "libs/angular-animate/angular-animate.js",
            "libs/angular-sanitize/angular-sanitize.js",
            "libs/angular-modal-service/dst/angular-modal-service.js",
            "libs/angular-cookies/angular-cookies.js",
            "libs/angular-touch/angular-touch.js",
            "libs/angular-translate/angular-translate.js",
            "libs/angular-ui-router/release/angular-ui-router.js",
            "libs/angular-spinner/angular-spinner.js",
            //"libs/odometer/odometer.js",
            //"libs/angular-odometer-js/dist/angular-odometer.js",
            "libs/bootstrap/dist/js/bootstrap.js",
            "libs/requirejs/require.js"
        ],
        prod: [
            "libs/lodash/dist/lodash.compat.min.js",
            "libs/jquery/dist/jquery.min.js",
            "libs/spin.js/spin.js",
            "libs/angular/angular.min.js",
            "libs/angular-animate/angular-animate.min.js",
            "libs/angular-sanitize/angular-sanitize.min.js",
            "libs/angular-modal-service/dst/angular-modal-service.js",
            "libs/angular-cookies/angular-cookies.js",
            "libs/angular-touch/angular-touch.min.js",
            "libs/angular-translate/angular-translate.min.js",
            "libs/angular-ui-router/release/angular-ui-router.min.js",
            "libs/angular-spinner/angular-spinner.min.js",
            "libs/odometer/odometer.min.js",
            "libs/angular-odometer-js/dist/angular-odometer.min.js",
            "libs/bootstrap/dist/js/bootstrap.min.js",
            "libs/requirejs/require.js",
            "hub/hub.js"
        ]
    },

    /**
     * The compiled HTML template JavaScript file as well as the name of the template angular module.
     */
    htmlTemplateName: "infrastructure/HTMLTemplateModule",

    /**
     * The compiled locales as an angular module.
     */
    localesModuleName: "infrastructure/LocalesModule",

    /**
     * Lists the individual locale directories that contains JSON localization resource bundles.
     */
    locale: [
        "app/locale/en_US/",
        "app/locale/es_ES/"
    ],

    /**
     * Defines server ports for local, static web server and karma servers.
     */
    ports: {
        webServer: {
            build : 8890,
            compile: 8890
        },
        karma: {
            unit: {
                runnerPort: 9101,
                port: 9877
            }
        }
    },

    /**
     * Use a proxy with our development server so we can gt around XDomain issues and make HTTP calls to our
     * remote API dev server.
     */
    proxy: {
        api: {
            host: "dcportal-md3.putnam.com",
            context: "/dc-ph2-participant-web",
            port: 443
        }
    }
};
