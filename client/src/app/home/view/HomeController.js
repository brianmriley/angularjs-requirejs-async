/**
 * @docType function
 * @ngDoc app
 * @name app.home.view:HomeController
 * @author Brian Riley
 * @date July 24, 2014
 * @copyright 2014 Putnam Investments Inc.
 * @description
 *
 *      The controller for the home view. Provides presentation methods and models to the corresponding view.
 *
 */
( function () {
    "use strict";

    var dependencies = [];

    /**
     * Register the module class with RequireJS.
     */
    define( "home/view/HomeController", dependencies, function () {

        /**
         * @description Constructor function for the controller.
         * @ngdoc method
         * @name app:HomeController#controller
         * @methodOf app:HomeController
         * @constructor
         */
        var HomeController = function ( $log, $scope, $state ) {

            /**
             * Reference to the $log.
             */
            $log = $log.getInstance( "HomeController" );

            //-----------------------------------------------------------------------
            // PROTECTED METHODS
            //-----------------------------------------------------------------------

            var logout = function () {
                $log.debug( "logout()" );

                $state.go( "login" );
            };

            //-----------------------------------------------------------------------
            // CONFIGURE PRESENTATION MODEL
            //-----------------------------------------------------------------------

            /////////////////////////////////////////////////////////////////////////
            // VIEW MODEL
            /////////////////////////////////////////////////////////////////////////

            $scope.viewModel = {};

            /////////////////////////////////////////////////////////////////////////
            // VIEW METHODS
            /////////////////////////////////////////////////////////////////////////

            $scope.logout = logout;

            /////////////////////////////////////////////////////////////////////////
            // DATA BINDING
            /////////////////////////////////////////////////////////////////////////

            //angular.utils.bindSetter( $scope, this, onPlanChg, pptInfoService, "model.activePlan", false );
        };

        /**
         * Publish constructor array.
         */
        return [ "$log", "$scope", "$state", HomeController ];
    } );
}() );
