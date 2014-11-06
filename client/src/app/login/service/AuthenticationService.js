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

	var dependencies = [
	];

	/**
	 * Register the module with RequireJS.
	 */
	define( "login/service/AuthenticationService", dependencies, function () {
		/**
		 * Constructor.
		 *
		 * @param $log
		 * @param $q
		 * @param $http
		 * @returns {{get: get}}
		 * @constructor
		 */
		var AuthenticationService = function ( $log, $q, $http, $state ) {

			/**
			 * Logger.
			 */
			$log = $log.getInstance( "AuthenticationService" );

			//-----------------------------------------------------------------------
			// PROTECTED METHODS
			//-----------------------------------------------------------------------

			/**
			 * Login mock service endpoint.
			 */
			var login = function (username, password) {

				$log.debug("login( {0}, {1} )", [username, password]);

				var dfd = $q.defer();

				if(password === "1234") {
					$state.go( "home" );
					dfd.resolve( { status: "success" } );
				} else {
					dfd.reject( "Incorrect password. For this demo please use `1234` for the password." );
				}

				return dfd.promise;
			};

			/**
			 * Logout mock service endpoint.
			 */
			var logout = function () {

				$log.debug("logout()");

				var dfd = $q.defer();
				$state.go( "login" );
				dfd.resolve( { status: "success" } );
				return dfd.promise;
			};

			//-----------------------------------------------------------------------
			// EVENT HANDLERS
			//-----------------------------------------------------------------------

			//			eventBus.addEventListener(FooEvent.FOO, onFoo, this);

			//-----------------------------------------------------------------------
			// API
			//-----------------------------------------------------------------------

			return {
				login: login,
				logout: logout
			};

		};

		/**
		 * Publish constructor array.
		 */
		return [ "$log", "$q", "$http", "$state", AuthenticationService ];

	} );
}() );
