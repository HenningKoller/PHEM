'use strict';

angular.module('myApp.startView', ['ngRoute'])

    .config(['$routeProvider', function($routeProivder) {
        $routeProivder.when('/startView', {
            templateUrl: 'startView/startPage.html',
            controller: 'startController'
        });
    }])

    .controller("startController", function($scope, $http) {
        initPage();

        function getPrograms() {
            $http.get('http://inf5750-20.uio.no/api/programs.json')
                .success(function(data, status, headers) {
                    console.log("Got Programs")
                    $scope.programList = data.programs;
                    $scope.program = $scope.programList[0];
                })
                .error(function(error) {
                    console.log("Error getting programs");
                    console.log(error);
                });
        }

        function getClinics() {
            $http.get('http://inf5750-20.uio.no/api/organisationUnitGroups/RXL3lPSK8oG.json')
                .success(function(data, status, headers) {
                    console.log("Got clinics")
                    $scope.clinics = data.organisationUnits;
                    $scope.clinic = $scope.clinics[0];
                })
                .error(function(error) {
                    console.log("Error getting clinics");
                    console.log(error);
                });
        }

        function initPage() {
            getPrograms();
            getClinics();
        }
    });
