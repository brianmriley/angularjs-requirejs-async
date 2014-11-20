/**
 * @author Brian Riley
 * @date November 5, 2014
 * @description
 *
 *      The authentication service.
 *
 */
( function () {
    "use strict";

    var dependencies = [];

    /**
     * Register the module with RequireJS.
     */
    define( "infrastructure/route/RouteManager", dependencies, function () {

        /**
         * Constructor.
         *
         * @param $log
         * @returns {{get: get}}
         * @constructor
         */
        var RouteManager = function ( $log, $rootScope, $state ) {

            /**
             * Logger.
             */
            $log = $log.getInstance( "RouteManager" );

            //-----------------------------------------------------------------------
            // PROTECTED METHODS
            //-----------------------------------------------------------------------

            /**
             * Login mock service endpoint.
             */
            var onStateChangeError = function ( event, toState, toParams, fromState, fromParams, error ) {
                $log.error( "onStateChangeError( From `{0}` -> `{1}`. Error: {2} )", [
                    fromState.name, toState.name, error.message
                ] );
            };

            //-----------------------------------------------------------------------
            // EVENT HANDLERS
            //-----------------------------------------------------------------------

            //			eventBus.addEventListener(FooEvent.FOO, onFoo, this);
            $rootScope.$on( "$stateChangeError", onStateChangeError );

            //-----------------------------------------------------------------------
            // API
            //-----------------------------------------------------------------------

            return {};

        };

        /**
         * Publish constructor array.
         */
        return [ "$log", "$rootScope", "$state", RouteManager ];

    } );
}() );
