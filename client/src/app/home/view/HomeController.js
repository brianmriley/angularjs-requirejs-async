/**
 * @author Brian Riley
 * @date November 5, 2014
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
        var HomeController = function ( $log, $scope, authenticationService, personManager, person ) {

            /**
             * Reference to the $log.
             */
            $log = $log.getInstance( "HomeController" );

            //-----------------------------------------------------------------------
            // PROTECTED METHODS
            //-----------------------------------------------------------------------

            var logout = function () {
                $log.debug( "logout()" );

                authenticationService.logout();
            };

            //-----------------------------------------------------------------------
            // CONFIGURE PRESENTATION MODEL
            //-----------------------------------------------------------------------

            /////////////////////////////////////////////////////////////////////////
            // VIEW MODEL
            /////////////////////////////////////////////////////////////////////////

            $scope.viewModel = {
                personManager: personManager,
                person: person
            };

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
        return [ "$log", "$scope", "authenticationService", "personManager", "person", HomeController ];
    } );
}() );
