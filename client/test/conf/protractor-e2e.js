/**
 * NodeJS configuration used for Protractor E2E Testing.
 *
 * This code does 3 things:
 * 1 ) Configures paths to files that define E2E tests.
 * 2 ) Starts up the Selenium testing server.
 * 3 ) Kicks off the tests with Chrome ONLY for now.
 *
 * @author Brian Riley
 * @date September 23, 2014
 *
 */

// -----------------------------------------------------------------
// JSHint Globals
// -----------------------------------------------------------------
/*global
 process: false,
 exports: false
 */

"use strict";

// determine if the developer's machine is Windows and create the file name with extension .exe
var isWin = !!process.platform.match(/^win/);
var chromeDriverExe = isWin ? "chromedriver.exe" : "chromedriver";

exports.config = {

    // -----------------------------------------------------------------
    // Selenium Setup: An existing Selenium standalone server.
    // -----------------------------------------------------------------

    // The address of an existing selenium server that Protractor will use.
    //
    // NOTE: This server must have chromedriver in its path for Chromium tests to work, which it does when you install protractor by default.
    // NOTE: Comment the following line out if you want protractor to fire up Selenium for you automatically if not, you need to start
    // Selenium manually with "node ./node_modules/protractor/bin/webdriver-manager start".
//    seleniumAddress: "http://localhost:4444/wd/hub",

    // -----------------------------------------------------------------
    // Specify the test code that will run.
    // -----------------------------------------------------------------

    // Spec patterns are relative to the location of this config.
    specs: [
        "../../test/e2e/*Scenario.js"
    ],

    // only run the tests on Chrome
    chromeOnly: true,

    // NOTE: It's possible the JAR could be upgraded so we'll simply use star and assume there's only 1 there for now...
    // If this breaks in the future, simply point to the exact JAR file as illustrated below
    seleniumServerJar: "../../node_modules/protractor/selenium/selenium-server-standalone-*.jar",
//    seleniumServerJar: "../../node_modules/protractor/selenium/selenium-server-standalone-2.42.2.jar",

    // If using Windows, we need to have an exe file extension. See top of file for more details
    chromeDriver: "../../node_modules/protractor/selenium/" + chromeDriverExe,

    capabilities: {
        browserName: "chrome",
        chromeOptions: {args: ["--disable-extensions"]}
    },

    // A callback function called once protractor is ready and available, and
    // before the specs are executed
    // You can specify a file containing code to run by setting onPrepare to
    // the filename string.
    onPrepare: function() {
    },

    // -----------------------------------------------------------------
    // Application configuration.
    // -----------------------------------------------------------------

    // A base URL for your application under test. Calls to browser.get() with relative paths will be prepended with this.
    // NOTE: Currently not using this as set the URL directly in tests in beforeEach()
//    baseUrl: "https://www.foo.com:8890",

    // -----------------------------------------------------------------
    // Jasmine configuration.
    // -----------------------------------------------------------------

    jasmineNodeOpts: {
        // onComplete will be called just before the driver quits.
        onComplete: null,
        // If true, display spec names.
        isVerbose: false,
        // If true, print colors to the terminal.
        showColors: true,
        // If true, include stack traces in failures.
        includeStackTrace: true,
        // Default time to wait in ms before a test fails.
        defaultTimeoutInterval: 10000
    }
};