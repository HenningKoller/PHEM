angular.module('myApp', [
    'ngRoute',
    'myApp.index',
    'myApp.form'
]).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/index'});
    }]);