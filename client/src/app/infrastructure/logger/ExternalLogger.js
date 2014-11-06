/**
 * @author Brian Riley
 * @date November 5, 2014
 * @description
 *
 *      ExternalLogger
 *
 *      Uses LogEnhancer functionality to publish instance
 *
 */
( function () {
    "use strict";

    var dependencies = [
        "infrastructure/logger/LogEnhancer"
    ];

    define( "infrastructure/logger/ExternalLogger", dependencies, function ( LogEnhancer ) {
        /**
         * @description
         * Determines if the requested console logging method is available, since it is not with IE.
         * @ngdoc method
         * @name app.util.logger:ExternalLogger#constructor
         * @methodOf app.util.logger:ExternalLogger
         *
         * @param {Function} method The request console logging method.
         * @returns {object} Indicates if the console logging method is available.
         * @private
         */
        var prepareLogToConsole = function ( method ) {
            var console = window.console;
            var logFn = function ( message ) {
                if ( isAvailableConsoleFor( method ) ) {
                    try {
                        console[ method ]( message );
                    } catch ( e ) {}
                }
            };

            return logFn;
        };

        var isFunction = function ( fn ) {
            return ( typeof ( fn ) === typeof ( Function ) );
        };

        var isAvailableConsoleFor = function ( method ) {
            // crashes in IE8 without developer tools open
            var console = window.console;
            if ( !method ) {
                throw new Error( "isAvailableConsoleFor():: Undefined method provided" );
            }

            return console && console[ method ] && isFunction( console[ method ] );
        };

        var $log = {
            log: prepareLogToConsole( "log" ),
            info: prepareLogToConsole( "info" ),
            warn: prepareLogToConsole( "warn" ),
            debug: prepareLogToConsole( "debug" ),
            error: prepareLogToConsole( "error" ),
            prepareLogToConsole: prepareLogToConsole,
            isFunction: isFunction,
            isAvailableConsoleFor: isAvailableConsoleFor
        };

        // Publish instance of $log simulator; with enhanced functionality
        return new LogEnhancer( $log );
    } );

} )();
