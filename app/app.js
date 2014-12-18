'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'appServices',
  'myApp.startView',
  'myApp.formView',
  'myApp.version'
])
    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.otherwise({redirectTo: '/startView'});
    }]);
