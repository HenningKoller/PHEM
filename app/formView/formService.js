'use strict';

angular.module('myApp.formView', ['ngRoute'])

    .config(['$routeProvider', function($routeProivder) {
        $routeProivder.when('/formView/:clinicId/:progId', {
            templateUrl: 'formView/form.html',
            controller: 'formController'
        });
    }])

    .controller("formController", function($scope, $http, $routeParams) {
        $scope.parsedDataElements = {};
        var dataElements = [];
        initPage();

        function getClinic() {
            $http.get("http://inf5750-20.uio.no/api/organisationUnits/"+$routeParams.clinicId+".json")
                .success(function (data, status, headers) {
                    console.log("Got Clinic");
                    $scope.clinicName = data.name;
                })
                .error(function (error) {
                    console.log("Error getting clinic");
                    console.log(error);
                });
        }

        function getProgramStages() {
            $http.get("http://inf5750-20.uio.no/api/programs/"+$routeParams.progId+".json")
                .success(function (data, status, headers) {
                    console.log("Got programStages");

                    //TODO can be more than one stage
                    getDataElements(data.programStages[0].id);
                })
                .error(function (error) {
                    console.log("Error getting programStages");
                    console.log(error);
                });
        }

        function getDataElements(id) {
            $http.get("http://inf5750-20.uio.no/api/programStages/"+id+".json")
                .success(function (data, status, headers) {
                    console.log("Got DataElements");
                    parseStageElements(data.programStageDataElements);
                })
                .error(function (error) {
                    console.log("Error getting programStages");
                    console.log(error);
                });
        }

        function parseStageElements(stageElements) {
            for(var i = 0; i < stageElements.length; i++) {
                dataElements.push(stageElements[i].dataElement);
            }
            parseDataElement(dataElements);
        }

        function parseDataElement(dataElements) {
            for (var i = 0; i < dataElements.length; i++) {
                var dataName = dataElements[i].name.split("_");
                if(dataName[1] in $scope.parsedDataElements) {
                    $scope.parsedDataElements[dataName[1]].push({name: dataName[0], id:dataElements[i].id, value: false});
                } else {
                    $scope.parsedDataElements[dataName[1]] = [{name: dataName[0], id:dataElements[i].id, value: false}];
                }
            }
            buildTable();
        }
        
        function resetFormValues() {
            angular.forEach($scope.parsedDataElements, function (values, key) {
                angular.forEach(values, function(value) {
                    value.value = false;
                })
            })
        }

        function buildTable() {
            $scope.rowLength = 0;
            angular.forEach($scope.parsedDataElements, function (value, key) {
                if (value.length > $scope.rowLength) {
                    $scope.rowLength = value.length;
                }
            });
        }

        function initPage() {
            getClinic();
            getProgramStages();
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

        $scope.clear_form = function(){
            console.log("Refreshing page to clear data");
            location.reload();
        };

        /* TODO just to visualize data
        $scope.parsedDataElements = {
            Age: [{name: "Journal", id: "gsuofd16543", value: false}, {name: "ART Registry", id: "3fasd3234"}, {name: "Database", id: "gsresgfj123"}],
            Sex: [{name: "Journal", id: "d16543"}, {name: "ART Registry", id: "3fasd3234"}, {name: "Database", id: "pppp3"}],
            Height: [{name: "Journal", id: "tyiut43"}, {name: "ART Registry", id: "4iiuoyj"}, {name: "Database", id: "2349gsdflk"}],
            Weight: [{name: "Journal", id: "83jhyth"}, {name: "ART Registry", id: "456hhyht"} , {name: "Database", id: "09gdfs"}]
        };
        */
    });
