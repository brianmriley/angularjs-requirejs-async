/**
 * This file is here to expose the AJS module `angularSpinner` in way that works with Karma + RJS + AJS. All we really did was
 * remove the attempt to expose this as an RJS AMD and simply leave the AJS code that creates the module. The other thing we did
 * was create a global Spinner object just like the spin.js dependency this module uses -- since we're just fixing unit tets that
 * don't use UI elements, this is fine.
 */

"use strict";

var Spinner = {};

angular
    .module('angularSpinner', [])

    .factory('usSpinnerService', ['$rootScope', function ($rootScope) {
        var config = {};

        config.spin = function (key) {
            $rootScope.$broadcast('us-spinner:spin', key);
        };

        config.stop = function (key) {
            $rootScope.$broadcast('us-spinner:stop', key);
        };

        return config;
    }])

    .directive('usSpinner', ['$window', function ($window) {
        return {
            scope: true,
            link: function (scope, element, attr) {
                var SpinnerConstructor = Spinner || $window.Spinner;

                scope.spinner = null;

                scope.key = angular.isDefined(attr.spinnerKey) ? attr.spinnerKey : false;

                scope.startActive = angular.isDefined(attr.spinnerStartActive) ?
                    attr.spinnerStartActive : scope.key ?
                    false : true;

                function stopSpinner() {
                    if (scope.spinner) {
                        scope.spinner.stop();
                    }
                }

                scope.spin = function () {
                    if (scope.spinner) {
                        scope.spinner.spin(element[0]);
                    }
                };

                scope.stop = function () {
                    scope.startActive = false;
                    stopSpinner();
                };

                scope.$watch(attr.usSpinner, function (options) {
                    stopSpinner();
                    scope.spinner = new SpinnerConstructor(options);
                    if (!scope.key || scope.startActive) {
                        scope.spinner.spin(element[0]);
                    }
                }, true);

                scope.$on('us-spinner:spin', function (event, key) {
                    if (key === scope.key) {
                        scope.spin();
                    }
                });

                scope.$on('us-spinner:stop', function (event, key) {
                    if (key === scope.key) {
                        scope.stop();
                    }
                });

                scope.$on('$destroy', function () {
                    scope.stop();
                    scope.spinner = null;
                });
            }
        };
    }]);