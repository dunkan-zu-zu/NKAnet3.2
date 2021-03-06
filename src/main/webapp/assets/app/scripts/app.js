'use strict';

/**
 * @ngdoc overview
 * @name assetsApp
 * @description
 * # assetsApp
 *
 * Main module of the application.
 */
var app = angular
    .module('assetsApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'angularBootstrapNavTree'
    ])
    .constant('DOMAIN', "" + window.location.protocol + '//'+ window.location.hostname+":8080")
    .config(function ($routeProvider, $httpProvider) {
        $httpProvider.defaults.useXDomain = true;

        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/orders', {
                templateUrl: 'views/orders.html',
                controller: 'OrdersCtrl'
            })
            .when('/order/:id', {
                templateUrl: 'views/order.html',
                controller: 'OrderCtrl'
            })
            .when('/order', {
                templateUrl: 'views/order.html',
                controller: 'OrderCtrl'
            })
            .when('/object', {
                templateUrl: 'views/object.html',
                controller: 'ObjectCtrl'
            })
            .when('/doc', {
                templateUrl: 'views/doc.html',
                controller: 'DocCtrl'
            })
            .when('/subject', {
                templateUrl: 'views/subject.html',
                controller: 'SubjectCtrl'
            })
            .when('/items', {
                templateUrl: 'views/items.html',
                controller: 'ItemsCtrl'
            })
            .when('/dict', {
                templateUrl: 'views/catalogs.html',
                controller: 'CatalogCtrl'
            })
            .when('/dependency', {
                templateUrl: 'views/dependency.html',
                controller: 'DependencyCtrl'
            })
            .when('/test', {
                templateUrl: 'views/test.html',
                controller: 'TestCtrl'
            })
            .otherwise({
                redirectTo: '#/'
            });
    })
    .run(function ($timeout, $location, $rootScope) {
        $rootScope.text = {
            general: "ГЛАВНАЯ",
            settings: "НАСТРОЙКИ",
            exit: "ВЫХОД",
            technicalSupport: "Тех поддержка"
        }

    })
    .directive('modal', function () {
        return {
            template: '<div class="modal fade">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content">' +
            '<div class="modal-header">' +
            '<button type="button" class="close" data-dismiss="modal" aria-hidden="true" ng-click="modal()">&times;</button>' +
            '<h4 class="modal-title">{{ title }}</h4>' +
            '</div>' +
            '<div class="modal-body" ng-transclude>' +
            '</div></div>' +
            '</div>' +
            '</div>',
            restrict: 'E',
            transclude: true,
            replace: true,
            scope: true,
            link: function postLink(scope, element, attrs) {
                scope.title = attrs.title;

                scope.$watch(attrs.visible, function (value) {
                    if (value == true)
                        $(element).modal('show');
                    else
                        $(element).modal('hide');
                });

                $(element).on('shown.bs.modal', function () {
                    scope.$apply(function () {
                        scope.$parent[attrs.visible] = true;
                    });
                });

                $(element).on('hidden.bs.modal', function () {
                    scope.$apply(function () {
                        scope.$parent[attrs.visible] = false;
                    });
                });
            }
        };
    })
    .filter('filterSubjectType', function () {
        return function (items) {
            var filtered = [];
            if (items != undefined) {
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    if (item.code_id < 500 && (item.code_id == 100 || item.code_id == 200 || item.code_id >= 300 )) {
                        filtered.push(item);
                    }
                }
            }
            return filtered;
        };
    })
    .filter('filterSubjectTypeForCreate', function () {
        return function (items) {
            var filtered = [];
            if (items != undefined) {
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    if (item.code_id < 200 && item.code_id != 100) {
                        filtered.push(item);
                    }
                }
            }
            return filtered;
        };
    }).directive('clickAnywhereButHere', function($document){
        return {
            restrict: 'A',
            link: function(scope, elem, attr, ctrl) {
                elem.bind('click', function(e) {
                    // this part keeps it from firing the click on the document.
                    e.stopPropagation();
                });
                $document.bind('click', function() {
                    // magic here.
                    scope.$apply(attr.clickAnywhereButHere);
                })
            }
        }
    });