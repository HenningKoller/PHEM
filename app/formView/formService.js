'use strict';

var services = angular.module('myApp.formView', ['ngRoute']);

services.config(['$routeProvider', function($routeProivder) {
    $routeProivder.when('/formView/:clinicId/:stageId/:progId', {
        templateUrl: 'formView/form.html',
        controller: 'formController'
    });
}]);

services.controller("formController",['$scope', '$http', '$routeParams', '$location', '$log', '$route', 'apiServices', function($scope, $http, $routeParams, $location, $log, $route, apiServices) {
    $scope.parsedDataElements = {};
    $scope.allArtifacts = {};
    $scope.table = {};
    var dataElements = [];
    var date = new Date();
    var pos;
    initPage();

    var postJson = {
        program: $routeParams.progId,
        orgUnit: $routeParams.clinicId,
        eventDate: date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate(),
        status: "COMPLETED",
        storedBy: "admin",
        coordinate: {latitude: "xx", longitude: "yy"},
        dataValues: []
    };


    function getClinic() {
        apiServices.getClinic($routeParams.clinicId).get(function(data) {
            $log.info("Fetched Clinic");
            $scope.clinicName = data.name;
        }, function(reason) {
            $log.error("Error getting Clinic");
            $log.debug(reason);
        });

        /*
         $http.get("http://inf5750-20.uio.no/api/organisationUnits/"+$routeParams.clinicId+".json")
         .success(function (data, status, headers) {
         $log.info("Got Clinic");
         $scope.clinicName = data.name;
         })
         .error(function (data, status, headers) {
         $log.info("Error getting clinic");
         $log.debug(status);
         });*/
    }

    function getProgramStages(id) {
        apiServices.getStages($routeParams.stageId)
            .query(function(data) {
                $log.info("Got ProgramStage");
                parseStageElements(data.programStageDataElements);
            }, function(reason) {
                $log.error("Error getting programStage");
                $log.debug(reason);
            });
    }

    function postForm() {
        $log.info("Posting form");
        $http.post("http://inf5750-20.uio.no/api/events", postJson)
            .success(function (data, status, headers) {
                $log.info("Post worked!");
                $log.debug(status);
                $log.debug(data);
            })
            .error(function (data, status, headers) {
                $log.info("Post failed");
                $log.debug(status);
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

            if(!(dataName[0] in $scope.allArtifacts)) {
                $scope.allArtifacts[dataName[0]] = {name: dataName[0]};
            }

            if(dataName[1] in $scope.parsedDataElements) {
                $scope.parsedDataElements[dataName[1]].push({name: dataName[0], id:dataElements[i].id, value: false});
            } else {
                $scope.parsedDataElements[dataName[1]] = [{name: dataName[0], id:dataElements[i].id, value: false}];
            }
        }
        buildTable();
    }

    function buildTable() {
        angular.forEach($scope.parsedDataElements, function (value, key) {
            $scope.table[key] = [];
        });

        angular.forEach($scope.parsedDataElements, function (value, key)  {
            $log.debug(key);
            $log.debug("-----------");
            angular.forEach($scope.allArtifacts, function (value2, key2)  {
                var hasArtifact = false;
                for(var j = 0; j < value.length; j++) {
                    if(key2 === value[j].name) {
                        hasArtifact = true;
                        $scope.table[key].push(value[j]);
                        $log.debug(key2 + " - true");
                    }
                }

                if(!hasArtifact) {
                    $scope.table[key].push({name: "noCheckBox"})
                    $log.debug(key2 + " - false");
                }
            });
            $log.debug("");
        });
    }

    function resetFormValues() {
        angular.forEach($scope.parsedDataElements, function (values, key) {
            angular.forEach(values, function(value) {
                value.value = false;
            })
        })
    }

    function createPostJson() {
        postJson.coordinate.latitude = pos.coords.latitude;
        postJson.coordinate.longitude = pos.coords.longitude;

        angular.forEach($scope.parsedDataElements, function (values, key) {
            angular.forEach(values, function(value) {
                postJson.dataValues.push({dataElement: value.id, value: value.value});
            })
        })
    }

    function getGeoLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                $scope.$apply(function () {
                    pos = position;
                });
            });
        }
    }

    function initPage() {
        getClinic();
        getProgramStages();
        getGeoLocation();
    }

    $scope.post_patient = function(){
        createPostJson();
        $log.info(postJson);
        $log.info("Posting patient to db...");
        postForm();
        $route.reload();
    };

    $scope.clear_form = function(){
        $log.info("Refreshing page to clear data");
        $route.reload();
    };

    $scope.go_home = function(){
        $log.info("Going to homepage");
        $location.path('/startView');
    };

    /* TODO just to visualize data
     $scope.parsedDataElements = {
     Age: [{name: "Journal", id: "gsuofd16543", value: false}, {name: "ART Registry", id: "3fasd3234"}, {name: "Database", id: "gsresgfj123"}],
     Sex: [{name: "Journal", id: "d16543"}, {name: "ART Registry", id: "3fasd3234"}, {name: "Database", id: "pppp3"}],
     Height: [{name: "Journal", id: "tyiut43"}, {name: "ART Registry", id: "4iiuoyj"}, {name: "Database", id: "2349gsdflk"}],
     Weight: [{name: "Database", id: "09gdfs"}]
     };
     */
}]);
