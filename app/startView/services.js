'use strict';

var services = angular.module('myApp.startView', ['ngRoute']);

services.config(['$routeProvider', function($routeProivder) {
    $routeProivder.when('/startView', {
        templateUrl: 'startView/startPage.html',
        controller: 'startController'
    });
}]);

services.controller("startController", ['$http', '$scope', '$log', 'apiServices', function($http, $scope, $log, apiServices) {
    initPage();

    function getPrograms() {
        apiServices.getProgramByName("QA-Tool").then(function(res) {
            $scope.program = res;
            getProgramStages();
        },function(reason) {
            $log.info("Error getting program by name");
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
        apiServices.getOrganizationUnit('Clinic').then(function(res){
            apiServices.getClinics(res).query(function(data) {
                $log.info("Fetched Clinics");
                $scope.clinics = data.organisationUnits;
                $scope.clinic  = $scope.clinics[0];
            }, function(reason) {
                $log.error("Error getting clinics");
                $log.debug(reason);
            });
        }, function(error){
            $log.error("Error: " + error);
        });
    }

    $scope.getStages = function() {
        $log.info("Getting new Stages");
        getProgramStages();
    };

    function initPage() {
        getPrograms();
        getClinics();
    }
}]);
