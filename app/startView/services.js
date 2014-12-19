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

services.controller("startController", ['$http', '$scope', '$log', 'apiServices', function($http, $scope, $log, apiServices) {
    initPage();


    function getPrograms() {
        apiServices.getProgram().query(function(data){
            $log.info("Got Programs");
            $scope.programList = data.programs;
            $scope.program = $scope.programList[0];
            getProgramStages();
        }, function(reason){
            $log.error("Error getting programs")
            $log.debug(reason);
        });
    }

    function getProgramStages() {
        apiServices.getProgramStages($scope.program.id).query(function(data) {
            $log.info("Fetched programStages");

            $scope.stageList = data.programStages;
            $scope.stage = $scope.stageList[0];
        },function(reason){
            $log.error("Error getting programStages");
            $log.debug(reason);
        });
    }

    function getClinics() {
        $http.get('http://inf5750-20.uio.no/api/organisationUnitGroups/RXL3lPSK8oG.json')
            .success(function(data, status, headers) {
                $log.info("Fetched clinics");
                $scope.clinics = data.organisationUnits;
                $scope.clinic = $scope.clinics[0];
            })
            .error(function(data, status, headers) {
                $log.error("Error getting clinics");
                $log.debug(status);
            });
    }

     $scope.getStages = function() {
     console.log("HEI");
     getProgramStages();
     };

    function initPage() {
        getPrograms();
        getClinics();
    }
}]);
