/**
 * NodeJS configuration used for the Karma Server.
 *
 * This code does 3 things:
 * 1 ) Configures NodeJS Karma server with frameworks: Jasmine and RequireJS.
 * 2 ) Auto-loads the 3rd party libs like jQuery, AngularJS, and AngularJS Mock.
 * 3 ) Configures paths that should be included in the browser using <script> tag? or loaded them manually, eg. using Require.js.
 *
 * @author Brian Riley
 * @date July 29, 2014
 *
 */

"use strict";

module.exports = function ( config ) {

    config.set( {

        /**
         * From where to look for files, starting with the location of this file.
         */
        basePath: "../../",

        /**
         * Frameworks to use; by specifying `requirejs` we do not have to manually
         * load them here in the config
         */
        frameworks: [
            "jasmine",
	        "requirejs",
            "fixture"
        ],

        /**
         * This is the list of file patterns to load into the browser during testing.
         */
        files: [

	        ////////////////////////////////////////////////////////////////////////////////////////////////////////////
	        // libraries
	        ////////////////////////////////////////////////////////////////////////////////////////////////////////////

	        // TODO: BMR: Make this more generic and patter based...coming back to this so we can move forward with RJS + AJS unit tests
            // NOTE: For some reason the patterns didn't work and unit tests failed so including these individually for now
	        "server/dev/libs/jquery.js",
	        "server/dev/libs/angular.js",
	        "server/dev/libs/angular-mocks.js",
	        "server/dev/libs/angular-ui-router.js",
	        "server/dev/libs/angular-translate.js",
	        "server/dev/libs/angular-sanitize.js",
	        "server/dev/libs/angular-touch.js",
            "server/dev/libs/angular-modal-service.js",
	        "server/dev/libs/js/bootstrap.min.js",
            "server/dev/libs/hub.js",
            "server/dev/libs/angular-odometer-js.js",
//	        "server/dev/libs/libs.js",

            // NOTE: This is a workaround to the Karma + RJS issues this module exposes natively -- read the comments at the top
            // of the file for details. DO NOT include refs to the real module or unit tests will break.
            "test/libs/angular-spinner-unit-test-hack.js",
//            "server/dev/libs/spin.js", // DO NOT USE
//            "server/dev/libs/angular-spinner.js", // DO NOT USE

            // TODO: BMR: Bad pattern
//	        { pattern: "server/dev/libs/*.js", watched: false, included: true },

            // NOTE: DO NOT load LoDash into Karma at startup and allow RequireJS to load later to avoid conflicts -- this work
            // id done in bootstrap-unit.js
//            "server/dev/libs/lodash.js",

	        ////////////////////////////////////////////////////////////////////////////////////////////////////////////
	        // Source & Tests
	        ////////////////////////////////////////////////////////////////////////////////////////////////////////////

            // fixtures
            { pattern: "server/dev/data/**/*.json" },

	        { pattern: "server/dev/**/*.js", watched: false, included: false },
//	        { pattern: "server/dev/HTMLTemplateModule.js", served: true, included: false },
//	        { pattern: "server/dev/locale/locales.json", served: true, included: false },

            // NOTE: Use this only if keeping unit tests in a separate directory
//            { pattern: "test/unit/**/*.js", watched: false, included: false },

	        // Load and run the RequireJS/Karma bootstrap
	        // NOTE: we do NOT use the application's bootstrap.js since this custom one will auto-run Karma once loaded.
	        "test/unit/bootstrap-unit.js"
        ],
	    /**
	     * List of files to exclude -- it's important not to include the real app's bootstrap file.
         *
         * TODO: BMR: Can we use a pattern here so we don't need to be explicit? The patterns seemed to bomb unit testing
	     */
        exclude: [
            "server/dev/bootstrap.js",
            "server/dev/libs/angular-animate.js",
            "server/dev/libs/jasmine.js",
            "server/dev/libs/bootstrap.js",
            "server/dev/libs/requirejs.js",
            "server/dev/libs/spin.js",
            "server/dev/libs/angular-spinner.js"
            //"server/dev/libs/odometer.js",
            //"server/dev/libs/angular-odometer-js.js"
        ],

	    /**
	     * List of plugins for Karma to load -- the important ones are jasmine and require.
	     */
        plugins: [
            "karma-jasmine",
            "karma-requirejs",
            "karma-fixture",
            "karma-json-fixtures-preprocessor",
            "karma-coverage",
	        "karma-junit-reporter",
	        "karma-phantomjs-launcher",
            "karma-firefox-launcher",
            "karma-chrome-launcher",
            "karma-ie-launcher",
            "karma-safari-launcher"
        ],

        /**
         * How to report, by default.
         */
        reporters: [
            "junit",
            "dots",
//            "progress",
            "coverage"
        ],

        /**
         * Create a report.
         */
        junitReporter: {
            // will be resolved to basePath (in the same way as files/exclude patterns)
            outputFile: "server/unit-results.xml"
        },

        // enable / disable colors in the output (reporters and logs)
        colors: true,

	    /**
	     * On which port should the browser connect, on which port is the test runner
	     * operating, and what is the URL path for the browser to use.
	     */
	    port: 9018,
	    runnerPort: 9100,
	    urlRoot: "/",

	    /**
	     * Level of logging: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
	     */
        logLevel: config.LOG_INFO,

        /**
         * Disable file watching by default.
         */
        autoWatch: false,

	    /**
	     * Continuous Integration mode -- if true, it capture browsers, run tests and exit. The CI is set up by Grunt
	     * in a watch task and run whenever ay app source code or unit tests change.
	     */
        singleRun: true,

        //        proxies : {
        //            "/assets/images/" : "http://localhost:9018/base/bin/dev/assets/images/"
        //        },

        /**
         * The list of browsers to launch to test on. This includes only "Firefox" by default, but other browser
         * names include:
         *
         * PhantomJS (DEFAULT)
         * Firefox
         * Chrome
         * ChromeCanary
         * Opera
         * Safari (only Mac)
         * IE (only Windows)
         * process.env.TRAVIS
         *
         * Note that you can also use the executable name of the browser, like "chromium" or "firefox", but that these
         * vary based on your operating system.
         *
         * You may also leave this blank and manually navigate your browser to http://localhost:9018/ when you're
         * running tests. The window/tab can be left open and the tests will automatically occur there during the build.
         * This has the aesthetic advantage of not launching a browser every time you save.
         */
        browsers: [
//          "Firefox",
//          "Chrome"
            "PhantomJS"
        ],

        /**
         * Source files that you want to generate code coverage for. Do not include libs.
         */
        preprocessors: {
            "server/dev/**/*.js": ["coverage"],
            "!server/dev/libs/**/*.js": ["coverage"],
            "server/dev/data/**/*.json": ["json_fixtures"]
        },

	    /**
	     * If browser does not capture in given timeout [ms], kill it  CLI --capture-timeout 5000
	     */
        captureTimeout: 20000,

	    /**
	     * report which specs are slower than 500ms CLI --report-slower-than 500
	     */
        reportSlowerThan: 500,

	    /**
	     * Fixes some security issues when running Chrome.
	     */
        customLaunchers: {
            chrome_without_security: {
                base: "Chrome",
                flags: [ "--disable-web-security" ]
            }
        }
    });
};
