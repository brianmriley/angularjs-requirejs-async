/**
 * @docType function
 * @ngDoc util
 * @name app.util.logger:LogEnhancer
 * @author Brian Riley
 * @date July 24, 2014
 * @copyright 2014 Putnam Inc.
 * @description
 *
 *      Used within AngularJS to enhance functionality within the AngularJS $log service.
 */
( function () {
    "use strict";

    var dependencies = [
        "util/StringUtil",
        "util/BrowserDetect",
        "util/URLUtil"
    ];

    /**
     * Register the class with RequireJS.
     */
    define( "infrastructure/logger/LogEnhancer", dependencies, function () {
        var StringUtil = require( "util/StringUtil" );
        var BrowserDetect = require( "util/BrowserDetect" );
        var URLUtil = require( "util/URLUtil" );

        /**
         * @description
         *
         * @ngdoc method
         * @name app.util.logger:LogEnhancer#constructor
         * @methodOf app.util.logger:LogEnhancer
         *
         * @param {object} $log The log console.
         * @returns {object} promise.
         * @private
         */
        var enhanceLogger = function ( $log ) {
            //-----------------------------------------------------------------------
            // CONSTANT
            //-----------------------------------------------------------------------
            var INVALID_DATA;
            var context = "[JS]";
            var separator = " - ";
            var localLogLevel;
            var globalLogLevel;

            /**
             * @description
             * Capture the original $log functions; for use in enhancedLogFn()
             * @ngdoc method
             * @name app.util.logger:LogEnhancer#_$log
             * @methodOf app.util.logger:LogEnhancer
             * @param {object} $log The log console.
             * @returns {object} promise.
             */
            var _$log = ( function ( $log ) {
                return {
                    log: $log.log,
                    debug: $log.debug,
                    info: $log.info,
                    warn: $log.warn,
                    error: $log.error
                };
            } )( $log );

            var loggerLevel = {

                /**
                 * @property {String} LEVEL_LOG A constant. Indicates the "all" logging level.
                 * @static
                 */
                LEVEL_ALL: 0, // Its not required here since we are logging globalLevel >= localLoglevel

                /**
                 * @property {String} LEVEL_LOG A constant. Indicates the "log" logging level.
                 * @static
                 */
                LEVEL_LOG: 2,

                /**
                 * @property {String} LEVEL_DEBUG A constant. Indicates the "debug" logging level.
                 * @static
                 */
                LEVEL_DEBUG: 4,

                /**
                 * @property {String} LEVEL_INFO A constant. Indicates the "info" logging level.
                 * @static
                 */
                LEVEL_INFO: 6,

                /**
                 * @property {String} LEVEL_WARN A constant. Indicates the "warn" logging level.
                 * @static
                 */
                LEVEL_WARN: 8,

                /**
                 * @property {String} LEVEL_ERROR A constant. Indicates the "error" logging level.
                 * @static
                 */
                LEVEL_ERROR: 12

            };

            var levelMarkup = {};
            levelMarkup[ "" + loggerLevel.LEVEL_INFO ] = "[INFO]";
            levelMarkup[ "" + loggerLevel.LEVEL_DEBUG ] = "[DEBUG]";
            levelMarkup[ "" + loggerLevel.LEVEL_WARN ] = "[WARN]";
            levelMarkup[ "" + loggerLevel.LEVEL_ERROR ] = "[ERROR]";
            levelMarkup[ "" + loggerLevel.LEVEL_LOG ] = "[LOG]";
            levelMarkup[ "" + loggerLevel.LEVEL_ALL ] = "[LOG]";

            /**
             * @description
             * Chrome Dev tools supports color logging
             * @see https://developers.google.com/chrome-developer-tools/docs/console#styling_console_output_with_css
             * @ngdoc method
             * @name app.util.logger:LogEnhancer#colorify
             * @methodOf app.util.logger:LogEnhancer
             * @param {object} message The message content.
             * @param {object} colorCSS The css color.
             * @returns {object} promise.
             */
            var colorify = function ( message, colorCSS ) {
                var isChrome = ( BrowserDetect.browser === "Chrome" ),
                    canColorize = isChrome && ( colorCSS !== undefined );

                return canColorize ? [ "%c" + message, colorCSS ] : [ message ];
            };

            /**
             * @description
             * Partial application to pre-capture a logger function
             * @ngdoc method
             * @name app.util.logger:LogEnhancer#prepareLogFn
             * @methodOf app.util.logger:LogEnhancer
             * @param {object} logFn The log function.
             * @param {object} className The class name.
             * @param {object} colorCSS The css color.
             * @returns {object} promise.
             */
            var prepareLogFn = function ( logFn, className, colorCSS ) {
                var getLogLevel = function ( logFn ) {
                    switch ( logFn ) {
                    case _$log.info:
                        localLogLevel = loggerLevel.LEVEL_INFO;
                        return localLogLevel;

                    case _$log.debug:
                        localLogLevel = loggerLevel.LEVEL_DEBUG;
                        return localLogLevel;

                    case _$log.warn:
                        localLogLevel = loggerLevel.LEVEL_WARN;
                        return localLogLevel;

                    case _$log.error:
                        localLogLevel = loggerLevel.LEVEL_ERROR;
                        return localLogLevel;

                    case _$log.log:
                        localLogLevel = loggerLevel.LEVEL_LOG;
                        return localLogLevel;

                    default:
                        localLogLevel = loggerLevel.LEVEL_ALL;
                        return localLogLevel;
                    }
                };

                /**
                 * Invoke the specified `logFn` with the supplant functionality...
                 */
                var enhancedLogFn = function () {
                    try {
                        var args = Array.prototype.slice.call( arguments ),
                            now = getTimestamp(),
                            logLevel = getLogLevel( logFn ),
                            level = levelMarkup[ "" + logLevel ],
                            _context = ( context !== "" ) ? context + " " : "";

                        if ( checkLogLevel( logLevel ) ) {
                            // NOTE: This is extremely useful to developers as we were silently catching errors and the
                            // logger provided no useful information so it was incredibly difficult to track down errors.
                            // If an error is throw now, we still capture the error but the logger spits out the full
                            // stack trace easily allowing developers to find the issue
                            if ( !className && args[ 0 ] instanceof Error ) {
                                className = String( args[ 0 ].stack );
                            }

                            // prepend a timestamp and optional class name to the original output message
                            args[ 0 ] = StringUtil.supplant( "{0}{1} {2} {3}{4}", [ _context, now,
                                level, className ? className : "", args[ 0 ]
                            ] );
                            //							args[0] = "BMR";
                            args = colorify( StringUtil.supplant.apply( null, args ), colorCSS );

                            logFn.apply( null, args );
                        }
                    } catch ( error ) {
                        $log.error( "LogEnhancer ERROR: " + error );
                        INVALID_DATA = error;
                        throw ( new Error( INVALID_DATA ) );
                    }

                };

                // Only needed to support angular-mocks expectations
                enhancedLogFn.logs = [];

                return enhancedLogFn;
            };

            /**
             * Creates a print-friendly timestamp in the form of 16:11:45:956 for logging purposes.
             *
             * @return {String} A timestamp in the form of 16:11:45:956.
             */
            var getTimestamp = function () {

                var date = new Date();
                var hours = date.getHours();
                var minutes = date.getMinutes();
                var seconds = date.getSeconds();
                var milliseconds = date.getMilliseconds();

                if ( hours < 10 ) {
                    hours = "0" + hours;
                }

                if ( minutes < 10 ) {
                    minutes = "0" + minutes;
                }

                if ( seconds < 10 ) {
                    seconds = "0" + seconds;
                }

                if ( milliseconds < 10 ) {
                    milliseconds = "00" + milliseconds;
                } else if ( milliseconds < 100 ) {
                    milliseconds = "0" + milliseconds;
                }

                return hours + ":" + minutes + ":" + seconds + ":" + milliseconds;
            };

            /**
             * @description
             * Check the global log level with local log level helps to filter console log message.
             * @ngdoc method
             * @name app.util.logger:LogEnhancer#checkLogLevel
             * @methodOf app.util.logger:LogEnhancer
             *
             * @returns {boolean} true if applicable to console log message and vice versa
             */
            var checkLogLevel = function ( logLevel ) {
                if ( localLogLevel >= globalLogLevel ) {
                    return true;
                } else if ( logLevel >= globalLogLevel ) {
                    return true;
                }
                return false;
            };

            /**
             * @description
             * Support to generate class-specific logger instance with class name only
             * @ngdoc method
             * @name app.util.logger:LogEnhancer#getInstance
             * @methodOf app.util.logger:LogEnhancer
             * @param {object} className Name of object in which $log.<function> calls is invoked.
             * @param {object=} [colorCSS] Object with CSS style color information for Chrome Dev Tools console log colorizing
             * @param {object=} [customSeparator] Object with CSS style color information for Chrome Dev Tools console log colorizing
             *
             * @returns {object} Logger instance
             */
            var getInstance = function ( className, colorCSS, customSeparator ) {

                className = ( className !== undefined ) ? className + ( customSeparator || separator ) :
                    "";

                var instance = {
                    log: prepareLogFn( _$log.log, className, colorCSS ),
                    debug: prepareLogFn( _$log.debug, className, colorCSS ),
                    info: prepareLogFn( _$log.info, className, colorCSS ),
                    warn: prepareLogFn( _$log.warn, className, colorCSS ),
                    error: prepareLogFn( _$log.error, className ) // No styling of ERROR messages
                };

                // Set default global log level helps to filter the console log messages and keeps the app
                // form bombing when using large amounts of logging
                globalLogLevel = loggerLevel.LEVEL_ERROR;

                // --------------------------------------------------------------------
                // Debug support and Production logging
                // --------------------------------------------------------------------

                if ( URLUtil.getURLParam( "debug" ) === "true" ) {
                    globalLogLevel = loggerLevel.LEVEL_DEBUG;
                }

                return instance;
            };

            $log.log = prepareLogFn( $log.log );
            $log.info = prepareLogFn( $log.info );
            $log.warn = prepareLogFn( $log.warn );
            $log.debug = prepareLogFn( $log.debug );
            $log.error = prepareLogFn( $log.error );

            // Add special method to AngularJS $log
            $log.getInstance = getInstance;
            $log._$log = _$log;
            $log.colorify = colorify;
            $log.prepareLogFn = prepareLogFn;
            $log.INVALID_DATA = INVALID_DATA;
            $log.context = context;
            return $log;
        };

        return enhanceLogger;
    } );

} )();
