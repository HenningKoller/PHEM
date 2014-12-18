'use strict';

angular.module('myApp.startView', ['ngRoute'])

    .config(['$routeProvider', function($routeProivder) {
        $routeProivder.when('/startView', {
            templateUrl: 'startView/startPage.html',
            controller: 'startController'
        });
    }])

    .controller("startController", function($scope, $http, $log) {
        initPage();

        function getPrograms() {
            $http.get('http://inf5750-20.uio.no/api/programs.json')
                .success(function(data, status, headers) {
                    $log.info("Fetched programs");
                    $scope.programList = data.programs;
                    $scope.program = $scope.programList[0];
                    getProgramStages();
                })
                .error(function(errodata, status, headers) {
                    $log.error("Error getting programs");
                    $log.debug(status);
                });
        }

        function getProgramStages() {
            $http.get("http://inf5750-20.uio.no/api/programs/"+$scope.program.id +".json")
                .success(function (data, status, headers) {
                    $log.info("Fetched programStages");

                    $scope.stageList = data.programStages;
                    $scope.stage = $scope.stageList[0];
                })
                .error(function (data, status, headers) {
                    $log.error("Error getting programStages");
                    $log.debug(status);
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
            getProgramStages();
            $log.info("Fetched stages");
        };

        function initPage() {
            getPrograms();
            getClinics();
        }
    });
