'use strict';

angular.module('myApp.formView', ['ngRoute'])

    .config(['$routeProvider', function($routeProivder) {
        $routeProivder.when('/formView/:clinicId/:progId', {
            templateUrl: 'formView/form.html',
            controller: 'formController'
        });
    }])

    .controller("formController", function($scope, $http, $routeParams) {
        $scope.checkboxes = [];

        $scope.artifacts = {};
        var dataElementGroup;
        var dataElements = [];
        var progId = "yER7LmNjloJ";
        getProgramStages();

        function getProgramStages() {
            $http.get("http://inf5750-20.uio.no/api/programs/"+progId+".json")
                .success(function (data, status, headers) {
                    console.log("Got programStages");
                    console.log(data.programStages[0].id);

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
                    console.log(data.programStageDataElements);
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
            console.log(dataElements);
            parseDataElement(dataElements);
        }

        function parseDataElement(dataElements) {
            for (var i = 0; i < dataElements.length; i++) {
                var dataName = dataElements[i].name.split("_");
                if(dataName[1] in $scope.artifacts) {
                    $scope.artifacts[dataName[1]].row.push(dataName[0]);
                } else {
                    $scope.artifacts[dataName[1]] = {row: [dataName[0]]};
                }
            }
            console.log($scope.artifacts);
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
            Age: [["Journal", "gsuofd16543"], ["ART Registry", "3fasd3234"], ["Database", "gsresgfj123"]],
            Sex: [["Journal", "d16543"], ["ART Registry", "3fasd3234"], ["Database", "pppp3"]],
            Height: [["Journal", "tyiut43"], ["ART Registry", "4iiuoyj"], ["Database", "2349gsdflk"]],
            Weight: [["Journal", "83jhyth"], ["ART Registry", "456hhyht"], ["Database", "09gdfs"]]
        };


        $scope.rowLength = 0;


        angular.forEach($scope.rows, function(value, key) {
            if(value.length > $scope.rowLength) {
                $scope.rowLength = value.length;
            }
        });


        function initCheckboxes(){
            angular.forEach($scope.checkboxes, function(key, value){
                console.log(key);
                console.log(value);
                $scope.checkboxes.push("value[1] NO");
            });


        };

        $scope.clear_form = function(){
            console.log("Refreshing page to clear data");
            location.reload();
        };


    });