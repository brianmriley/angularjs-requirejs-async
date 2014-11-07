/**
 * @author Brian Riley
 * @date November 5, 2014
 * @description
 *
 *      The controller for the foo view. Provides presentation methods and models to the corresponding view.
 *
 */
( function () {
    "use strict";

    var dependencies = [];

    /**
     * Register the module class with RequireJS.
     */
    define( "foo/view/FooController", dependencies, function () {

        /**
         * @description Constructor function for the controller.
         * @ngdoc method
         * @name app:FooController#controller
         * @methodOf app:FooController
         * @constructor
         */
        var FooController = function ( $log, $scope, $state, authenticationService, personManager, person ) {

            /**
             * Reference to the $log.
             */
            $log = $log.getInstance( "FooController" );

            //-----------------------------------------------------------------------
            // PROTECTED METHODS
            //-----------------------------------------------------------------------

            var logout = function () {
                $log.debug( "logout()" );

                authenticationService.logout();
            };

            var home = function () {
                $log.debug( "home()" );

                $state.go( "home" );
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

            /////////////////////////////////////////////////////////////////////////
            // DATA BINDING
            /////////////////////////////////////////////////////////////////////////

            //angular.utils.bindSetter( $scope, this, onFooChg, fooService, "model.selectedFoo", false );
        };

        /**
         * Publish constructor array.
         */
        return [ "$log", "$scope", "$state", "authenticationService", "personManager", "person", FooController ];
    } );
}() );
