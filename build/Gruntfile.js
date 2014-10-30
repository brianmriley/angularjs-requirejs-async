/**
 * Grunt build file for the application.
 *
 * The build does things like "compiling" all of the code for both development and production modes; it'll reformat the
 * code, run JSHint, build localization resource bundles, run unit tests, fire up a dev web server, and even watch
 * for changes to files to rerun these tasks during development mode.
 *
 * High-Level Task Outline:
 *
 *      1) build    Simply builds the application for development purposes by concatenating the individual files together. Not uglifed.
 *      2) dev      Uses the build task and then runs unit tests and configures a local web server for testing. Any changes to the
 *                  JavaScript source are picked up and the unit tests are run and then the library is deployed locally.
 *      3) prod     Uses the build task's generated application and uglifies it. Add the argument `run` and you can test the build
 *                  locally: grunt prod:run
 *
 * The `configureProxies` task is part of `grunt-connect-proxy` plugin and not defined in this file. The proxies are configured in the
 * connect task, but the task to create and use them is `configureProxies`.
 *
 * There are now 2 ways to run E2E tests:
 *
 *      1) If you are running `grunt dev` then the web server is already running, so you can simply open another terminal
 *      and run `grunt protractor`.
 *      2) If not running `grunt dev`, then  run `grunt e2e` which will build and fire up the web server and then run the e2e tests.
 *
 * @author Brian Riley
 * @date October 30, 2014
 *
 */

"use strict";

module.exports = function ( grunt ) {

    // measures the time each task takes
    require( "time-grunt" )( grunt );

    // TODO: BMR: allows each grunt task to be placed in /grunt/{taskName}.js so this file doesn't become bloated
    // load grunt config
    //	require("load-grunt-config")(grunt);

    /**
     * Load required Grunt tasks. These are installed based on the versions listed
     * in `package.json` when you do `npm install` in this directory.
     */
    require( "load-grunt-tasks" )( grunt );

    /**
     * Load in our build configuration file.
     */
    var userConfig = require( "./build.config.js" );

    /**
     * This is the configuration object Grunt uses to give each plugin its instructions.
     */
    var taskConfig = {

        /**
         * We read in our `package.json` file so we can access the package name and version. It's already there, so
         * we don't repeat ourselves here.
         */
        pkg: grunt.file.readJSON( "package.json" ),

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        /**
         * The banner is the comment that is placed at the top of our compiled source files. It is first processed
         * as a Grunt template, where the `<%=` pairs are evaluated based on this very configuration object.
         */
        meta: {
            banner: "/**\n" +
                " * @name\t\t<%= pkg.name %>\n" +
                " * @version\t\t<%= pkg.version %>\n" +
                " * @date\t\t<%= grunt.template.today('yyyy-mm-dd') %>\n" +
                " * @homepage\t<%= pkg.homepage %>\n" +
                " * @copyright\t<%= grunt.template.today('yyyy') %> <%= pkg.author %>\n" +
                " * @description\n" +
                " * \n" +
                " *\t\t<%= pkg.description %>\n" +
                " */\n"
        },

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        /**
         * Cleans out directories so we can start fresh.
         */
        clean: {
            options: {
                force: true
            },
            //libs: [ "libs" ], // TODO ???
            dev: [ "<%= buildDir %>/*" ],
            prod: [ "<%= compileDir %>/*" ],
            postProd: [ "<%= compileDir %>/infrastructure" ],
            postProdE2E: [ "<%= compileDir %>/data" ]
        },

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        /**
         * Runs shell/terminal commands. We're currently use this to install webdriver_manager for selenium E2E testing.
         */
        shell: {
            installSeleniumServer: {
                options: {
                    stdout: true
                },
                command: "node ./node_modules/protractor/bin/webdriver-manager update"
            }
        },

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        /**
         * Concatenates multiple files into a single unit. This is used for both libraries and source code and in different modes for
         * development verse production.
         *
         * The templates and locales are generated AngularJS files, so we wrap them in RequireJS module definitions as well.
         *
         * TODO: BMR: Since the only real diff here is the output destination directory for "templates" and "locales" this should be cleaned up and made DRY
         */
        concat: {
            devTemplates: {
                options: {
                    process: {
                        data: {
                            moduleName: "<%= htmlTemplateName %>"
                        }
                    }
                },
                src: [
                    "require.module.prefix",
                    "<%= buildDir %>/<%= htmlTemplateName %>.js",
                    "require.module.suffix"
                ],
                dest: "<%= buildDir %>/<%= htmlTemplateName %>.js"
            },
            devLocales: {
                options: {
                    process: {
                        data: {
                            moduleName: "<%= localesModuleName %>"
                        }
                    }
                },
                src: [
                    "require.module.prefix",
                    "<%= buildDir %>/<%= localesModuleName %>.js",
                    "require.module.suffix"
                ],
                dest: "<%= buildDir %>/<%= localesModuleName %>.js"
            },
            prodTemplates: {
                options: {
                    process: {
                        data: {
                            moduleName: "<%= htmlTemplateName %>"
                        }
                    }
                },
                src: [
                    "require.module.prefix",
                    "<%= compileDir %>/<%= htmlTemplateName %>.js",
                    "require.module.suffix"
                ],
                dest: "<%= compileDir %>/<%= htmlTemplateName %>.js"

            },
            prodLocales: {
                options: {
                    process: {
                        data: {
                            moduleName: "<%= localesModuleName %>"
                        }
                    }
                },
                src: [
                    "require.module.prefix",
                    "<%= compileDir %>/<%= localesModuleName %>.js",
                    "require.module.suffix"
                ],
                dest: "<%= compileDir %>/<%= localesModuleName %>.js"
            },
            login: {
                src: [
                    "<%= srcDir %>/ajsUtils/**/*.js",
                    "<%= srcDir %>/dataServices/interceptor/*.js",
                    "<%= srcDir %>/eventBus/**/*.js",
                    "<%= srcDir %>/util/**/*.js",
                    "<%= srcDir %>/main/events/MainEvent.js",
                    "<%= srcDir %>/common/model/SpinnerConfig.js",
                    "<%= srcDir %>/main/events/SessionEvent.js",
                    "<%= srcDir %>/main/model/ModalButtonModel.js",
                    "<%= srcDir %>/main/service/MessagingService.js",
                    "<%= srcDir %>/main/view/modals/MessagingModalController.js",
                    "<%= srcDir %>/login/**/*.js",
                    "!<%= srcDir %>/**/*Spec.js",
                    "<%= srcDir %>/infrastructure/**/*Module.js",
                    "<%= compileDir %>/infrastructure/**/*Module.js",
                    "!<%= srcDir %>/login/LoginModule.js",
                    "<%= srcDir %>/login/LoginModule.js",
                    "!<%= srcDir %>/login/LoginBootstrap.js",
                    "<%= srcDir %>/login/LoginBootstrap.js"
                ],
                dest: "<%= compileDir %>/login/login.js"
            },
            app: {
                src: [
                    "<%= srcDir %>/**/*.js",
                    "!<%= srcDir %>/**/*Spec.js",
                    "!<%= srcDir %>/login/**/*.js",
                    "<%= compileDir %>/infrastructure/**/*Module.js",
                    "!<%= srcDir %>/**/*Module.js",
                    "<%= srcDir %>/**/*Module.js",
                    "!<%= srcDir %>/ApplicationModule.js",
                    "<%= srcDir %>/ApplicationModule.js",
                    "!<%= srcDir %>/bootstrap.js",
                    "<%= srcDir %>/bootstrap.js"
                ],
                dest: "<%= compileDir %>/app.js"
            },
            libs: {
                src: "<%= libs.prod %>",
                dest: "<%= compileDir %>/libs/libs.js"
            }
        },

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        /**
         * Processes HTML files like grunt templates. Currently, we're using this to replace inline JS libs for dev
         * with one, concatenated lib.js for prod.
         */
        processhtml: {
            login: {
                files: {
                    "<%= compileDir %>/login/index.html": [ "<%= srcDir %>/login/index.html" ],
                    "<%= compileDir %>/login/postLogin.html": [ "<%= srcDir %>/login/postLogin.html" ]
                }
            },
            prod: {
                files: {
                    "<%= compileDir %>/index.html": [ "index.html" ]
                }
            }
        },

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        /**
         * Rips through the code and applies a formatter based on rules defined in the JSBeautifier config file.
         */
        jsbeautifier: {
            options: {
                config: ".jsbeautifyrc",
                css: {
                    fileTypes: [ ".less" ]
                },
                html: {
                    fileTypes: [ ".jst", ".html" ]
                }
            },
            files: [
                "<%= srcDir %>/{,**/}*.js",
                "<%= testDir %>/unit/**/*Spec.js",
                "Gruntfile.js"
            ]
        },

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        /**
         * JSHint task to make sure our JS "compiles" and follows all the expected JS runtime/browser rules...protects
         * us from simple RTEs and the like and performs a detailed code sanity check.
         *
         * `jshint` defines the rules of our linter as well as which files we should check. This file, all javascript
         * sources, and all our unit tests are linted based on the policies listed in `options`. But we can also
         * specify exclusionary patterns by prefixing them with an exclamation point (!); this is useful when code comes
         * from a third party but is nonetheless inside our source code directory.
         */
        jshint: {
            options: {
                jshintrc: ".jshintrc",
                reporter: require( "jshint-stylish" )
            },
            files: "<%= jsbeautifier.files %>"
        },

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        /**
         * The Karma unit test runner configurations.
         */
        karma: {
            options: {
                configFile: "<%= testDir %>/conf/karma-unit.js"
            },
            unit: {
                singleRun: true
            }
        },

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        /**
         * The Protractor E2E test runner configurations.
         */
        protractor: {
            options: {
                configFile: "<%= testDir %>/conf/protractor-e2e.js",
                keepAlive: true, // If false, the grunt process stops when the test fails.
                noColor: false, // If true, protractor will not use colors in its output.
                debug: false, // If true, protractor will not use colors in its output.
                args: {
                    // Arguments passed to the command
                }
            },
            // this is required or you need make the task protractor:run
            run: {

            }
        },

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        /**
         * Concatenates all of the of the individual locale files into 1 AngularJS Module.
         */
        buildLocales: {
            options: {
                angularModule: true,
                module: "<%= localesModuleName %>"
            },
            dev: {
                src: "<%= locale %>",
                dest: "<%= buildDir %>/<%= localesModuleName %>.js",
                angularModule: true,
                module: "<%= localesModuleName %>"
            },
            prod: {
                src: "<%= locale %>",
                dest: "<%= compileDir %>/<%= localesModuleName %>.js",
                angularModule: true,
                module: "<%= localesModuleName %>"
            }
        },

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        /**
         * Adds injector annotations to ensure the IDs for injectable objects aren't lost during minification.
         *
         * NOTE: This does not work with RJS. Luckily we use constructor arrays to get around this.
         */
        ngAnnotate: {
            options: {},
            prod: {
                "<%= compileDir %>/app.js": [ "<%= compileDir %>/app.js" ]
            }
        },

        /**
         * Adds injector annotations to ensure the IDs for injectable objects aren't lost during minification.
         *
         * NOTE: This does not work with RJS. Luckily we use constructor arrays to get around this.
         */
        ngmin: {
            prod: {
                src: [ "<%= compileDir %>/app.js" ],
                dest: "<%= compileDir %>/app.js"
            }
        },

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        /**
         * Minify the JavaScript source and make it production ready.
         */
        uglify: {
            options: {
                banner: "<%= meta.banner %>",
                compress: {
                    drop_console: true
                },
                report: "min",
                preserveComments: false,
                sourceMap: true,
                sourceMapIncludeSources: true,
                mangle: true
            },
            login: {
                files: {
                    "<%= compileDir %>/login/login.js": [ "<%= compileDir %>/login/login.js" ]
                }
            },
            prod: {
                files: {
                    //                    "<%= buildDir %>/<%= pkg.name %>.min.js": [ "<%= compileDir %>/app.js" ]
                    "<%= compileDir %>/app.js": [ "<%= compileDir %>/app.js" ]
                }
            }
        },

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        /**
         * Currently just using this for dev to copy over all of the individual files to the dev web server. We use
         * uglify to concat and min for prod.
         */
        // TODO: BMR: Not using this due to the RJS Optimizer's inability to process variables in the require() statements
        // require
        requirejs: {
            dev: {
                options: {
                    //mainConfigFile: "config/require.dev.conf.js",
                    appDir: "<%= srcDir %>",
                    baseUrl: ".",
                    dir: "<%= buildDir %>",
                    allowSourceOverwrites: false,
                    useStrict: true,
                    keepBuildDir: true,
                    optimize: "none",
                    inlineText: true
                }
            },
            prod: {
                options: {
                    //                    mainConfigFile: "config/require.dev.conf.js",
                    baseUrl: "<%= srcDir %>",
                    name: "ApplicationModule",
                    keepBuildDir: true,
                    //                    optimizeCss: "none",
                    //                    preserveLicenseComments: false,
                    optimize: "none",
                    uglify: {
                        mangle: false,
                        compress: {
                            sequences: false
                        }
                    },
                    //                    uglify2: {
                    //                        mangle: false
                    //                    },
                    //                    optimize: "uglify2",
                    out: "<%= compileDir %>/app.js"
                }
            }
        },

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        /**
         * Used to grab all of the bower JS libs and push them to the dev/prod directories. This eliminates the need to
         * list out the exact files to copy if the owner of the lib created a bower.json that specifies the dev and prod
         * versions of the lib.
         */
        bower: {
            dev: {
                dest: "<%= buildDir %>/libs",
                css_dest: "<%= buildDir %>/styles",
                options: {
                    baseUrl: "<%= buildDir %>/libs",
                    ignorePackages: [ "bootstrap, spin.js" ]
                }
            },
            prod: {
                //                dest: "<%= compileDir %>/libs",
                css_dest: "<%= compileDir %>/css"
                    //                options: {
                    //                    baseUrl: "<%= compileDir %>/libs",
                    //                    ignorePackages: [ "bootstrap", "angular", "angular", "angular-animate",
                    //                        "angular-mocks", "angular-touch", "angular-ui-router",
                    //                        "html5-boilerplate", "jquery"
                    //                    ]
                    //                }
            }
        },

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        copy: {

            dev: {
                files: [ {
                        expand: true,
                        dot: true,
                        cwd: ".",
                        dest: "<%= buildDir %>",
                        src: [
                            "index.html"
                        ]
                    }
                    //}, {
                    //    expand: true,
                    //    cwd: ".",
                    //    dest: "<%= buildDir %>/libs/",
                    //    filter: "isFile",
                    //    flatten: true,
                    //    src: [
                    //        "<%= hubDir %>/*.js"
                    //    ]
                    //}
                ]
            },

            spinJSHack: {
                files: [ {
                    expand: true,
                    cwd: ".",
                    dest: "<%= buildDir %>/libs/",
                    filter: "isFile",
                    flatten: true,
                    src: [
                        "<%= buildDir %>/libs/spin.js.js"
                    ],
                    rename: function ( dest, src ) {
                        return dest + src.replace( /\.js.js$/, ".js" );
                    }
                } ]
            },

            prod: {
                files: [ {
                    src: [ "<%= srcDir %>/styles/fonts/**" ],
                    dest: "<%= compileDir %>/styles/fonts/",
                    expand: true,
                    flatten: true,
                    filter: "isFile"
                }, {
                    expand: true,
                    dot: true,
                    cwd: "<%= srcDir %>/img",
                    src: "**",
                    dest: "<%= compileDir %>/img"
                }, {
                    src: [ "<%= srcDir %>/allowed_routes_config.json" ],
                    dest: "<%= compileDir %>",
                    expand: true,
                    flatten: true,
                    filter: "isFile"
                } ]
            },

            prodFixtures: {
                files: [ {
                    expand: true,
                    dot: true,
                    cwd: "<%= srcDir %>/data",
                    src: "**",
                    dest: "<%= compileDir %>/data"
                } ]
            },

            //replace:bootstrap should be called before this to fix paths
            bootstrap: {
                files: [ {
                    expand: true,
                    dot: true,
                    cwd: "<%= libDir %>/bootstrap/dist",
                    src: "**",
                    dest: "<%= buildDir %>/libs"
                }, {
                    expand: true,
                    dot: true,
                    cwd: "<%= libDir %>/bootstrap/dist/fonts",
                    src: "**",
                    dest: "<%= buildDir %>/styles/fonts"
                } ]
            }
        },

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // Less
        less: {
            options: {
                paths: [ "<%= srcDir %>/assets/less" ]
            },
            dev: {
                files: {
                    "<%= buildDir %>/styles/ppt.min.css": "<%= srcDir %>/assets/less/theme.less"
                }
            },
            prod: {
                files: {
                    "<%= compileDir %>/styles/ppt.min.css": "<%= srcDir %>/styles/putnam.theme.less"
                }
            }
        },

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        html2js: {
            options: {
                module: "<%= htmlTemplateName %>",
                src: [ "!<%= srcDir %>/index.html", "<%= srcDir %>/**/**/*.jst", "<%= srcDir %>/**/**/*.html" ],
                rename: function ( moduleName ) {
                    var name = moduleName.match( /app\/(.+)\.(jst|html)$/i )[ 1 ];
                    return name;
                },
                indentString: "    ",
                useStrict: true,
                htmlmin: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeComments: true,
                    removeEmptyAttributes: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true
                },
                singleModule: false
            },
            dev: {
                src: [ "<%= srcDir %>/**/**/*.jst", "<%= srcDir %>/**/**/*.html" ],
                dest: "<%= buildDir %>/<%= htmlTemplateName %>.js"
            },
            prod: {
                src: [
                    "<%= srcDir %>/**/**/*.jst",
                    "<%= srcDir %>/**/**/*.html",
                    "!<%= srcDir %>/login/**/*.html",
                    "<%= srcDir %>/login/view/**/*.html"
                ],
                dest: "<%= compileDir %>/<%= htmlTemplateName %>.js"
            }
        },

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        /**
         * Creates a web server for development with a proxy that allows cross domain requests to the API server.
         */
        connect: {
            options: {
                port: "<%= ports.webServer.build %>",
                base: "<%= buildDir %>",
                //protocol: "https", // TODO: Uncomment to make this work over HTTPS
                middleware: function ( connect, options ) {
                    if ( !Array.isArray( options.base ) ) {
                        options.base = [ options.base ];
                    }

                    // Setup the proxy
                    var middlewares = [ require( "grunt-connect-proxy/lib/utils" )
                        .proxyRequest
                    ];

                    // Serve static files.
                    options.base.forEach( function ( base ) {
                        middlewares.push( connect[ "static" ]( base ) );
                    } );

                    // Make directory browse-able.
                    var directory = options.directory || options.base[ options.base.length - 1 ];
                    middlewares.push( connect.directory( directory ) );

                    return middlewares;
                }

                // remove next from params
                //                middleware: function ( connect ) {
                //                    return [
                //
                //                        function ( req, res, next ) {
                //                            res.setHeader( "Access-Control-Allow-Origin", "*" );
                //                            res.setHeader( "Access-Control-Allow-Methods", "GET,PUT,POST,DELETE" );
                //                            res.setHeader( "Access-Control-Allow-Headers", "Content-Type" );
                //
                //                            // don"t just call next() return it
                //                            return next();
                //                        },
                //
                //                        // add other middlewares here
                //                        connect[ "static" ]( require( "path" )
                //                            .resolve( "." ) )
                //
                //                    ];
                //                }
            },
            dev: {
                options: {
                    port: "<%= ports.webServer.build %>",
                    base: "<%= buildDir %>",
                    keepalive: false
                }
            },
            prod: {
                options: {
                    port: "<%= ports.webServer.compile %>",
                    base: "<%= compileDir %>",
                    keepalive: true
                }
            },
            prodE2E: {
                options: {
                    port: "<%= ports.webServer.compile %>",
                    base: "<%= compileDir %>",
                    keepalive: false
                }
            },
            proxies: [ {
                context: "<%= proxy.api.context %>",
                host: "<%= proxy.api.host %>",
                port: "<%= proxy.api.port %>",
                https: true,
                changeOrigin: true,
                xforward: false
            } ]
        },

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        /**
         * Uses the OS's notification system to alert the developer of success or failures.
         */
        notify_hooks: {
            options: {
                enabled: true,
                max_js_hint_notifications: 5,
                title: "PPT Project"
            }
        },

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        /**
         * List the various assets -- source code, tests, locales, styles, etc -- to watch for changes that require
         * grunt build tasks to execute. Essentially enables continuous integration with automatic builds.
         */
        watch: {

            /**
             * Keep our build file looking good.
             */
            gruntfile: {
                files: "Gruntfile.js",
                tasks: [ "jshint" ]
            },

            /**
             * Keep an eye on our HTML and force builds.
             */
            html: {
                files: [
                    "<%= srcDir %>/*.html"
                ],
                tasks: [ "copy:dev" ]
            },

            /**
             * When our JavaScript source files change, we want to run lint them and run our unit tests.
             */
            jsSrc: {
                files: [
                    "<%= srcDir %>/*.html",
                    "<%= srcDir %>/**/*.js",
                    "<%= hubDir %>/*.js",
                    "<%= srcDir %>/data/*.json"
                ],
                //                tasks: [ "jsbeautifier", "jshint", "copy:dev", "requirejs:dev", "karma:unit" ]

                // TODO: BMR: Consider adding an arg to run with/out jsbeautifier
                //tasks: [ "jshint", "copy:dev", "requirejs:dev", "karma:unit" ] // TODO
                tasks: [ "jshint", "copy:dev", "requirejs:dev" ]
            },

            /**
             * When a JavaScript unit test file changes, we only want to lint it and run the unit tests. We don't want
             * to do any live reloading.
             *
             * TODO: BMR: This may not be necessary if we keep all unit tests in the actual src directory
             */
            jsUnit: {
                options: {
                    livereload: false
                },
                files: [
                    "<%= testDir %>/unit/**/*Spec.js"
                ],
                //                tasks: [ "jsbeautifier", "jshint", "karma:unit" ]
                //tasks: [ "jshint", "karma:unit" ] // TODO
                tasks: [ "jshint" ]
            },

            styles: {
                files: [
                    "<%= srcDir %>/assets/less/*.less"
                ],
                tasks: [ "less:dev" ],
                options: {
                    livereload: true
                }
            },

            /**
             * Compile all of our HTML view templates into JS so it can be cached in AJS's template caching system.
             */
            templates: {
                files: [
                    "<%= srcDir %>/**/**/*.jst",
                    "<%= srcDir %>/**/**/*.html"
                ],
                tasks: [ "html2js:dev", "concat:devTemplates" ],
                options: {
                    livereload: true
                }
            },

            /**
             * Bundle the locales into 1 file when they are changed.
             */
            locale: {
                files: [
                    "<%= srcDir %>/assets/locale/**/*.json"
                ],
                tasks: [ "buildLocales:dev", "concat:devLocales" ]
            }
        }
    };

    grunt.initConfig( grunt.util._.extend( taskConfig, userConfig ) );

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Custom Tasks
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Merge all of the individual JSON locale files into 1.
     */
    grunt.task.registerMultiTask( "buildLocales", "Build Locale file by concatenating individual locale JSON files.",
        function () {
            var filesLen;
            var destination = this.data.dest;

            /**
             * Pull the contents of each individual locale json file and merge them in with the final locale file using
             * their particular locale key as the main object for each specific locale.
             *
             * @param {String} abspath The absolute path to the file.
             * @param {String} rootdir The current file's directory, relative to rootdir.
             * @param {String} subdir The current file's directory, relative to rootdir.
             * @param {String} filename The filename of the current file, without any directory parts.
             */
            var recurseFiles = function ( abspath, rootdir /*, subdir, filename*/ ) {
                var locale;
                var incomingLocaleJSON;
                var existingLocaleJSON;
                var finalLocaleJSON;

                // if file does not have .json in skip
                if ( abspath.match( /.json$/i ) === null ) {
                    return;
                }

                // create the final locale object to write to the file
                finalLocaleJSON = {};

                // if the last char of the rootdir is a / remove it
                locale = rootdir;
                if ( locale.lastIndexOf( "/" ) === locale.length - 1 ) {
                    locale = locale.substring( 0, locale.length - 1 );
                }

                // grab the locale from the directory structure using the last directory containing the locale json file
                locale = locale.substring( locale.lastIndexOf( "/" ) + 1 );

                // grab the contents of each file
                incomingLocaleJSON = grunt.file.readJSON( abspath );

                // wrap the name value pairs for a given locale in a local object
                finalLocaleJSON[ locale ] = incomingLocaleJSON;

                // if destination file doesn't exist, then just copy it.
                if ( !grunt.file.exists( destination ) ) {
                    grunt.file.write( destination, JSON.stringify( finalLocaleJSON ) );
                } else {
                    // else read current destination file and merge it with the current locale object
                    existingLocaleJSON = grunt.file.readJSON( destination );
                    finalLocaleJSON = merge( existingLocaleJSON, finalLocaleJSON );
                    var finalLocaleJSONString = JSON.stringify( finalLocaleJSON );

                    grunt.file.write( destination, finalLocaleJSONString );
                }
            };

            // delete the locale file if it exists
            if ( grunt.file.exists( destination ) ) {
                // using associative array notation to get around delete being a reserved word and JSHint not a fan
                //			TODO: Consider setting up a specific JSHint target for our gruntfile with option for es5
                grunt.file[ "delete" ]( destination, {
                    force: true
                } );
                //			grunt.file.delete(destination, {force: true});
            }

            // if output dir doesn't exists, then create it
            var outputDir = destination.substring( 0, destination.lastIndexOf( "/" ) );
            if ( !grunt.file.exists( outputDir ) ) {
                grunt.file.mkdir( outputDir );
            }

            //            filesLen = this.filesSrc.length;
            filesLen = this.data.src.length;
            for ( var x = 0; x < filesLen; x++ ) {
                grunt.file.recurse( this.data.src[ x ], recurseFiles );
            }

            if ( this.data.angularModule ) {
                var module = this.data.module;
                var header = "angular.module('" + module + "',[])\n";
                var body = ".constant('LOCALES'," + JSON.stringify( grunt.file.readJSON( destination ) ) + ");";
                var footer = ";";
                var localesModule = header + body + footer;
                grunt.file.write( destination, localesModule );
            }

        } );

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Utility Functions
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Function takes any number of arguments. It can be used to merge objects and makes deep copies of
     * values. However, first argument is given by reference.
     *
     * @returns {*}
     */
    function merge() {
        /**
         * Determines if an object is valid.
         *
         * @param {Object} obj The object being checked for validity.
         * @returns {boolean} Boolean value indicating if the object is valid.
         * @private
         */
        var _isValidObject = function ( obj ) {
            return ( ( typeof obj !== "object" ) || ( obj === null ) );
        };

        /**
         * Inner function that merges two object and their properties.
         *
         * @param {Object} dst The destination object that contains the merged properties.
         * @param {Object} src The source object that's being merged into the destination object.
         * @returns {*} The final, merged object; aka the destination object.
         * @private
         */
        var _mergeObjects = function ( dst, src ) {
            if ( _isValidObject( src ) ) {
                return dst;
            }

            //loop through the properties of the JSON object. Must be a for-in loop
            for ( var p in src ) {
                //Need to wrap the body of the loop in a hasOwnProperty check to make JSHint happy
                if ( src.hasOwnProperty( p ) ) {
                    if ( src[ p ] === undefined ) {
                        continue;
                    }
                    if ( _isValidObject( src[ p ] ) ) {
                        dst[ p ] = src[ p ];
                    } else if ( _isValidObject( dst[ p ] ) ) {
                        dst[ p ] = _mergeObjects( src[ p ].constructor === Array ? [] : {}, src[ p ] );
                    } else {
                        _mergeObjects( dst[ p ], src[ p ] );
                    }
                }
            }
            return dst;
        };

        // Loop through arguments and merge them into the first argument.
        var out = arguments[ 0 ];
        if ( _isValidObject( out ) ) {
            return out;
        }
        for ( var i = 1, il = arguments.length; i < il; i++ ) {
            _mergeObjects( out, arguments[ i ] );
        }
        return out;
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Registered Tasks
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * The concat tasks for development.
     */
    grunt.registerTask( "concatDev", "Individually concatenates the HTML templates and localization resource bundles for development.", [
        "concat:devTemplates",
        "concat:devLocales"
    ] );

    /**
     * The concat tasks for production.
     */
    grunt.registerTask( "concatProd",
        "Individually concatenates the HTML templates, localization resource bundles, libraries, and app code for production.", [
            "concat:prodTemplates",
            "concat:prodLocales",
            "concat:app",
            "concat:libs"
        ] );

    /**
     * The login tasks for production.
     */
    grunt.registerTask( "login", "Performs all tasks to build login for production use. Dev task takes care of this for you automatically.", [
        "processhtml:login",
        "concat:login",
        "uglify:login"
    ] );

    /**
     * The `build` task gets your app ready to run for development and testing without running the server.
     */
    grunt.registerTask( "build", "Gets your app ready to run for development and testing without running a web server.", [
        "clean:dev",
        "buildLocales:dev", // TODO
        "jsbeautifier",
        "jshint",
        "bower:dev",
        "copy:dev",
        "copy:spinJSHack",
        "copy:bootstrap",
        "less:dev",
        "html2js:dev",
        "requirejs:dev",
        "concatDev"
    ] );

    /**
     * The `dev` task uses the build task and then runs unit tests and configures a local web server for testing.
     */
    grunt.registerTask( "dev", "Developer task that extends the build task and then runs unit tests and configures a local web server.", [
        "build",
        //"karma:unit", // TODO
        "configureProxies", // TODO
        "connect:dev",
        "watch",
        "notify_hooks"
    ] );

    /**
     * The `prod` task gets your app ready to run for production with minimized and uglified code.
     */
    grunt.registerTask( "prod", "Gets your app ready to run for production with minimized and uglified code.", function ( target ) {
        grunt.task.run( [
            "clean:prod",
            "buildLocales:prod",
            "jshint",
            "bower:prod",
            "processhtml:prod",
            "copy:prod",
            "copy:spinJSHack",
            "copy:bootstrap",
            "less:prod",
            "html2js:prod",
            "concatProd",
            "ngmin",
            "uglify:prod",
            "login",
            "karma:unit",
            "clean:postProd"
        ] );

        // this target allows developers to locally test the prod version of the app
        if ( target === "run" ) {
            grunt.task.run( [
                "copy:prodFixtures",
                "configureProxies",
                "connect:prod"
            ] );
        }
        // this target allows developers to run e2e tests on the prod version of the app
        else if ( target === "e2e" ) {
            grunt.task.run( [
                "copy:prodFixtures",
                "configureProxies",
                "connect:prodE2E",
                "protractor",
                "clean:postProdE2E"
            ] );
        }
    } );

    /**dev
     * Performs E2E testing in a single run. If the grunt task "grunt dev" is already running, just fire of another command to run
     * "grunt protractor". This task is used if not running the web server already.
     */
    grunt.registerTask( "e2e", "Performs E2E testing in a single run", [
        "build",
        "karma:unit",
        "configureProxies",
        "connect:dev",
        "protractor",
        "notify_hooks"
    ] );

    /**
     * Performs post NPM install actions. For now, this simply installs the Selenium server.
     */
    grunt.registerTask( "post-npm-install", "Runs after a successful NPM install.", [
        "shell:installSeleniumServer"
    ] );

    /**
     * The default task is to build.
     */
    grunt.registerTask( "default", [ "build" ] );

};
