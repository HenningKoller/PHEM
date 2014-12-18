'use strict';

var services = angular.module('myApp.startView', ['ngRoute']);

/*
 var apiServices;

 services.provider('service', [
 function() {
 var injector = angular.injector(['appServices']);
 apiServices = injector.get('apiServices');
 }]);*/

services.config(['$routeProvider', function($routeProivder) {
    $routeProivder.when('/startView', {
        templateUrl: 'startView/startPage.html',
        controller: 'startController'
    });
}]);

services.controller("startController", ['$scope', 'apiServices', function($scope, apiServices) {
    //initPage();
    console.log(apiServices.getProgram().query());

    /*
    function getPrograms() {

         $http.get('http://inf5750-20.uio.no/api/programs.json')
         .success(function(data, status, headers) {
         console.log("Got Programs")
         $scope.programList = data.programs;
         $scope.program = $scope.programList[0];
         getProgramStages();
         })
         .error(function(errodata, status, headers) {
         console.log("Error getting programs");
         console.log(status);
         });}*/
    }]);

function getProgramStages() {
    $http.get("http://inf5750-20.uio.no/api/programs/"+$scope.program.id +".json")
        .success(function (data, status, headers) {
            console.log("Got programStages");

            $scope.stageList = data.programStages;
            $scope.stage = $scope.stageList[0];
        })
        .error(function (data, status, headers) {
            console.log("Error getting programStages");
            console.log(status);
        });
};

function getClinics() {
    $http.get('http://inf5750-20.uio.no/api/organisationUnitGroups/RXL3lPSK8oG.json')
        .success(function(data, status, headers) {
            console.log("Got clinics")
            $scope.clinics = data.organisationUnits;
            $scope.clinic = $scope.clinics[0];
        })
        .error(function(data, status, headers) {
            console.log("Error getting clinics");
            console.log(status);
        });
};

/*
$scope.getStages = function() {
    console.log("HEI");
    getProgramStages();
};*/

function initPage() {
    getPrograms();
    getClinics();
};
