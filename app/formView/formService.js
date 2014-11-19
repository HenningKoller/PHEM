'use strict';

angular.module('myApp.formView', ['ngRoute'])

    .config(['$routeProvider', function($routeProivder) {
        $routeProivder.when('/formView/:clinicId/:progId', {
            templateUrl: 'formView/form.html',
            controller: 'formController'
        });
    }])

    .controller("formController", function($scope, $http, $routeParams) {

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
    });