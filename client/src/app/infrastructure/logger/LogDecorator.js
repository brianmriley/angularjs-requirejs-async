/**
 * @author Brian Riley
 * @date November 5, 2014
 * @description
 *
 *      Used within AngularJS to decorate/enhance the AngularJS $log service. The logger provides more robust and common
 *      logging features expected from enterprise loggers like Log4J. A typical log output might look like:
 *
 *      var username = "john.smith";
 *      var password = "p@ssw0rd";
 *      logger = $log.getInstance( "FooService" );
 *      logger.debug("myMethod( username = {0}, password = {1} )", [username, password]);
 *
 *      And the output would look like:
 *
 *      16:11:45:956 DEBUG [FooService] - myMethod( username = john.smith, password = p@ssw0rd}
 *
 */

( function () {
    "use strict";

    var dependencies = [
        "infrastructure/logger/LogEnhancer"
    ];

    /**
     * Register the class with RequireJS.
     */
    define( "infrastructure/logger/LogDecorator", dependencies, function ( enhanceLoggerFn ) {
        /**
         * @description
         *
         * @ngdoc method
         * @name app.util.logger:LogEnhancer#constructor
         * @methodOf app.util.logger:LogEnhancer
         * @param {object} $provide The log console.
         * @returns {object} promise.
         * @private
         */
        var LogDecorator = function ( $provide ) {

            // Register our $log decorator with AngularJS $provider
            $provide.decorator( "$log", [ "$delegate",
                function ( $delegate ) {
                    // NOTE: the LogEnhancer module returns a FUNCTION that we named `enhanceLoggerFn`
                    //       All the details of how the `enhancement` works is encapsulated in LogEnhancer!
                    enhanceLoggerFn( $delegate );

                    return $delegate;
                }
            ] );
        };

        /**
         * Publish constructor array
         */
        return [ "$provide", LogDecorator ];
    } );

} )();
