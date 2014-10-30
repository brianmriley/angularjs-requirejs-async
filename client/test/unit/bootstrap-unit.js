/**
 * Use RequireJS to configure and launch Karma unit testing for the specified Karma test *Spec.js files.
 *
 * This code does 3 things:
 *
 * 1) Configures RequireJS with settings needed by all the `define()` code blocks
 * 2) Sets up a unit testing AngularJS module with a dependency to the main app's module to preload all modules.
 * 3) Auto-starts Karma with the requireJS completion-callback; using `window.__karma__.start`
 *
 * @author Brian Riley
 * @date July 29, 2014
 */
(function ()
{
	"use strict";

	var tests = [];
	for(var file in window.__karma__.files)
	{
		if(/Spec\.js$/.test(file))
		{
			tests.push(file);
		}
	}

	require.config(
	{
		// Karma serves files from '/base' -- this is relative to the 'basePath' prop defined in karma-unit.js,
		// which in this case is the root of the project, so our build src is down a bit...
		baseUrl: "/base/server/dev",

		paths: {
            "angular": "libs/angular",
            "angular-animate": "libs/angular-animate",
            "angular-mocks": "libs/angular-mocks",
            "angular-sanitize": "libs/angular-sanitize",
            "angular-touch": "libs/angular-touch",
            "angular-translate": "libs/angular-translate",
            "angular-ui-router": "libs/angular-ui-router",
            "angular-spinner": "libs/angular-spinner",
            "twitter-bootstrap": "libs/js/bootstrap.min",
            "spin": "libs/spin",
            "angular-odometer-js": "libs/angular-odometer-js",
            "odometer": "libs/odometer"
		},

		shim:
		{
			"angular":
			{
				exports: "angular",
				deps: ["bootstrap"]
			},
            "lodash": {
                exports: "_"
            }
		},

		priority: ["angular"],

		// ask Require.js to load these test *Spec.js files
		deps: tests,

		waitSeconds: 0

		// NOTE: Not required since the require() method is the callback by default for require.config()
		// auto start test runner, once Require.js is done
		//		callback: require
	});

    // RequireJS dependencies
    var dependencies = [
        "util/logger/LogDecorator",
        "libs/lodash",
        "ApplicationModule"
    ];

	/**
	 * Register the module with RequireJS.
	 */
	require( dependencies, function ()
	{
		var LogDecorator = require( "util/logger/LogDecorator" );
		var ApplicationModule = require( "ApplicationModule" );
        var moduleName = "UnitTestApp";
        var moduleDependencies = [
            "angularModalService",
            ApplicationModule
        ];

		// Prepare `test` module for all the specs (if needed)
		angular.module(moduleName, moduleDependencies)
			.config(LogDecorator)
            .constant( "applicationConstants", {
                "IS_TESTING": "false"
            } );

		// kickoff the tests - this could be listed as the callback param in require.config() but then we couldn't
		// ensure the test module was created first
		window.__karma__.start();
	});

})();
