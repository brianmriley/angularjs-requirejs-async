/**
 * @author Brian Riley
 * @date November 5, 2014
 * @description
 *
 *      The controller for the bar view. Provides presentation methods and models to the corresponding view.
 *
 */
( function () {
    "use strict";

    var dependencies = [];

    /**
     * Register the module class with RequireJS.
     */
    define( "bar/view/BarController", dependencies, function () {

        /**
         * @description Constructor function for the controller.
         * @ngdoc method
         * @name app:BarController#controller
         * @methodOf app:BarController
         * @constructor
         */
        var BarController = function ( $log, $scope, $state, authenticationService, personManager, person ) {

            /**
             * Reference to the $log.
             */
            $log = $log.getInstance( "BarController" );

            //-----------------------------------------------------------------------
            // PROTECTED METHODS
            //-----------------------------------------------------------------------

            var logout = function () {
                $log.debug( "logout()" );

                authenticationService.logout();
            };

            var home = function () {
                $log.debug( "home()" );

                var homeModule = angular.module( "home/HomeModule" );
                var loginModule = angular.module( "LoginModule" );

                $state.go( "home" );
            };

            var foo = function () {
                $log.debug( "foo()" );

                $state.go( "foo" );
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
            $scope.home = home;
            $scope.foo = foo;

            /////////////////////////////////////////////////////////////////////////
            // DATA BINDING
            /////////////////////////////////////////////////////////////////////////

            //angular.utils.bindSetter( $scope, this, onBarChg, barService, "model.selectedBar", false );
        };

        /**
         * Publish constructor array.
         */
        return [ "$log", "$scope", "$state", "authenticationService", "personManager", "person", BarController ];
    } );
}() );
