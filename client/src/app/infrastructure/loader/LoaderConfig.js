///**
// * @docType module
// * @docType app
// * @name app.infrastructure:LoaderConfig
// * @author Kile Salmon
// * @date July 31, 2014
// * @copyright 2014 Putnam Inc.
// * @description
// *
// * This file sets up the configuration function for the Loader Page
// * Module. Currently, the only thing the config function is responsible
// * for is adding the modules states to the route provider.
// *
// * @author Kile Salmon
// *
// */
//( function () {
//	"use strict";
//
//	var dependencies = [];
//
//	define( "infrastructure/LoaderConfig", dependencies, function () {
//
//		/**
//		 * @description Constructor function for the config.
//		 * @ngdoc method
//		 * @name app.infrastructure:LoaderConfig#config
//		 * @methodOf app.infrastructure:LoaderConfig
//		 * @constructor
//		 */
//		var LoaderConfig = function ( $controllerProvider, $provide, $compileProvider, $filterProvider, $injector, $animateProvider ) {
//
//			// Substitute provider methods from app call the cached provider
//			angular.extend(loader, {
//
//				provider : function(name, constructor) {
//					$provide.provider(name, constructor);
//					return this;
//				},
//				controller : function(name, constructor) {
//					$controllerProvider.register(name, constructor);
//					return this;
//				},
//				directive : function(name, constructor) {
//					$compileProvider.directive(name, constructor);
//					return this;
//				},
//				filter : function(name, constructor) {
//					$filterProvider.register(name, constructor);
//					return this;
//				},
//				factory : function(name, constructor) {
//					$provide.factory(name, constructor);
//					return this;
//				},
//				service : function(name, constructor) {
//					$provide.service(name, constructor);
//					return this;
//				},
//				constant : function(name, constructor) {
//					$provide.constant(name, constructor);
//					return this;
//				},
//				value : function(name, constructor) {
//					$provide.value(name, constructor);
//					return this;
//				},
//				animation: angular.bind($animateProvider, $animateProvider.register)
//			});
//
//		};
//
//		/**
//		 * Publish constructor array.
//		 */
//		return [ "$stateProvider", LoaderConfig ];
//	} );
//}() );
