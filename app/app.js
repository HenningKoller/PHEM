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

/*
//Enable CORS(Cross-origin resource sharing)
myApp.config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);


//Adding authentication in headers
myApp.config(['$httpProvider', function($http){
  $http.defaults.headers.common['Authorization']= 'admin:district';
}]);*/
