/**
 * @docType function
 * @ngDoc app
 * @name app.login.view:LoginController
 * @author Brian Riley
 * @date July 24, 2014
 * @copyright 2014 Putnam Investments Inc.
 * @description
 *
 *      The controller for the login view. Provides presentation methods and models to the corresponding view.
 *
 */
( function () {
	"use strict";

	var dependencies = [
	];

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

				$state.go("home");
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

			//angular.utils.bindSetter( $scope, this, onPlanChg, pptInfoService, "model.activePlan", false );
		};

		/**
		 * Publish constructor array.
		 */
		return [ "$log", "$scope", "$state", LoginController ];
	} );
}() );