'use strict';

// Declare app level module which depends on views, and components
var dApp = angular.module('myApp', [
  'ngRoute',
  'appServices',
  'myApp.startView',
  'myApp.formView',
  'myApp.version'
]);

dApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/startView'});
}]);
