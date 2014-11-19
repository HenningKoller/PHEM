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

            $scope.post_patient = function(){

                if($scope.patientID == null){
                    alert("You have to specify Patient ID");
                }else{
                    console.log("Posting patient: " + $scope.patientID + " to db....");
                    location.reload();
                }
            };

            $scope.setPatient = function(name){
                $scope.patientID = name;
                console.log("name is: " + name);
                console.log("patientID is now " + $scope.patientID)
            };

            $scope.rows = {
                Age: ["Journal", "ART Registry", "Database"],
                Sex: ["Journal", "ART Registry", "Database"],
                Height: ["Journal", "ART Registry", "Database"],
                Weight: ["Journal", "ART Registry", "Database"]
            };

            $scope.rowLength = 0;


            angular.forEach($scope.rows, function(value, key) {
                if(value.length > $scope.rowLength) {
                    $scope.rowLength = value.length;
                }
            });

            $scope.checkboxes = {
                checked : []
            };


            $scope.clear_form = function(){
                console.log("Refreshing page to clear data");
                location.reload();
            };

            //TEST DATA
            $scope.programList =  [{
                id: "IpHINAT79UW",
                created: "2013-03-04T10:41:07.494+0000",
                name: "Child Programme",
                lastUpdated: "2014-01-09T18:11:38.621+0000",
            },
                {
                    id: "q04UBOqq3rp",
                    created: "2014-06-22T11:28:24.004+0000",
                    name: "Information Campaign",
                    lastUpdated: "2014-06-22T11:28:56.127+0000",
                },
                {
                    id: "eBAyeGv0exc",
                    created: "2013-03-04T10:41:07.494+0000",
                    name: "Inpatient morbidity and mortality",
                    lastUpdated: "2013-05-30T08:25:45.919+0000",
                },
                {
                    id: "uy2gU8kT1jF",
                    created: "2013-03-04T10:41:07.494+0000",
                    name: "MNCH / PNC (Adult Woman)",
                    lastUpdated: "2014-03-21T18:43:56.195+0000",
                },
                {
                    id: "fDd25txQckK",
                    created: "2014-04-25T13:14:18.868+0000",
                    name: "Provider Follow-up and Support Tool",
                    lastUpdated: "2014-04-30T11:09:28.495+0000",
                }];
            $scope.program = $scope.programList[0];

            $scope.clinics = [{
                id: "fXT1scbEObM",
                name: "Family Clinic",
                code: "OU_278360",
                created: "2012-02-17T14:54:39.987+0000",
                lastUpdated: "2014-03-02T21:16:07.539+0000",
            },
                {
                    id: "u6ZGNI8yUmt",
                    name: "Rina Clinic",
                    code: "OU_278313",
                    created: "2012-02-17T14:54:39.987+0000",
                    lastUpdated: "2014-03-02T21:16:05.760+0000",
                },
                {
                    id: "ctfiYW0ePJ8",
                    name: "Philip Street Clinic",
                    code: "OU_278364",
                    created: "2012-02-17T14:54:39.987+0000",
                    lastUpdated: "2014-03-02T21:16:03.968+0000",
                }];
            $scope.clinic = $scope.clinics[0];
        });