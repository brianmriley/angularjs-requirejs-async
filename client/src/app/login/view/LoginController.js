/**
 * @author Brian Riley
 * @date November 5, 2014
 * @description
 *
 *      The controller for the login view. Provides presentation methods and models to the corresponding view.
 *
 */
( function () {
    "use strict";

    var dependencies = [];

    /**
     * Register the module class with RequireJS.
     */
    define( "login/view/LoginController", dependencies, function () {

        /**
         * @description Constructor function for the controller.
         * @ngdoc method
         * @name app:LoginController#controller
         * @methodOf app:LoginController
         * @constructor
         */
        var LoginController = function ( $log, $scope, $state ) {

            /**
             * Reference to the $log.
             */
            $log = $log.getInstance( "LoginController" );

            //-----------------------------------------------------------------------
            // PROTECTED METHODS
            //-----------------------------------------------------------------------

            var login = function () {
                $log.debug( "login()" );

                //authenticationService.login("wasi", "1234");
                $state.go( "home" );
            };

            //-----------------------------------------------------------------------
            // CONFIGURE PRESENTATION MODEL
            //-----------------------------------------------------------------------

            /////////////////////////////////////////////////////////////////////////
            // VIEW MODEL
            /////////////////////////////////////////////////////////////////////////

            $scope.viewModel = {
                username: "",
                password: ""
            };

            /////////////////////////////////////////////////////////////////////////
            // VIEW METHODS
            /////////////////////////////////////////////////////////////////////////

            $scope.login = login;

            /////////////////////////////////////////////////////////////////////////
            // DATA BINDING
            /////////////////////////////////////////////////////////////////////////

            //angular.utils.bindSetter( $scope, this, onFooChg, fooService, "model.selectedFoo", false );
        };

        /**
         * Publish constructor array.
         */
        return [ "$log", "$scope", "$state", LoginController ];
    } );
}() );
