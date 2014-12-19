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
        var clinicOrgUnitId="test";
        apiServices.getOrganisationUnitGroups().query(function(data) {
            $log.info("Fetched organisationUnitGroups");

            for(var i = 0; i < data.organisationUnitGroups.length; i++) {
                $log.debug(data.organisationUnitGroups[i].name);
                if (data.organisationUnitGroups[i].name === "Clinic") {
                    $log.debug("great success!");
                    clinicOrgUnitId = data.organisationUnitGroups[i].id;
                }
            }

        }, function(reason) {
            $log.error("Error getting OrgUnitGroups");
            $log.debug(reason);
        });

        apiServices.getClinics(clinicOrgUnitId).query(function(data) {
            $scope.clinics = data.organisationUnits;
            $scope.clinic  = $scope.clinics[0];
        }, function(reason) {
            $log.error("Error getting clinics");
            $log.debug(reason);
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
