'use strict';

var appServices = angular.module('appServices', ['ngResource']);

appServices.factory('apiServices', function ($resource, $rootScope, $q, $http) {


    var xhReq = new XMLHttpRequest();
    xhReq.open("GET", "manifest.webapp", false);
    xhReq.send(null);

    var serverResponse = JSON.parse(xhReq.responseText);
    $rootScope.rootUrl = serverResponse.activities.dhis.href;

    return {
        getProgramByName : function(name){
            var deffered = $q.defer();
            $http.get($rootScope.rootUrl + '/api/programs.json')
                .success(function(data){
                    for(var i = 0; i < data.programs.length; i++){
                        if(data.programs[i].name === name){
                            deffered.resolve(data.programs[i]);
                        }
                    }
                    deffered.reject("Unknown Unit");
                })
                .error(function(data, status, headers){
                    deffered.reject("Error: " + status);
                });
            return deffered.promise;
        },
        getProgram: function () {
            return $resource($rootScope.rootUrl + '/api/programs.json', {},
                {
                    query: {
                        isArray: false
                    }
                });
        },
        getProgramStages: function (id) {
            return $resource($rootScope.rootUrl + '/api/programs/' + id + '.json', {},
                {
                    query: {
                        isArray: false
                    }
                });
        },
        getClinics: function (id) {
            return $resource($rootScope.rootUrl + '/api/organisationUnitGroups/' + id + '.json', {},
                {
                    query: {
                        isArray: false
                    }
                });
        },
        getClinic: function (id) {
            return $resource($rootScope.rootUrl + "/api/organisationUnits/" + id + ".json");
        },
        getOrganizationUnit : function(name){

            /* Promis API version. Couldn't get to work due to: Type Error: Object not a function.
            return $q(function(resolve, reject){
                $http.get($rootScope.rootUrl + "/api/organisationUnitLevels.json").
                    success(function(data) {
                        for(var i = 0 ; i < data.organisationUnitGroups.length; i++){
                            if(data.organisationUnitGroups[i].name === name){
                                resolve(data.organisationUnitGroups[i].id);
                            }
                        }
                        reject("Unknown");
                    }).error(function(data){
                        reject("Server error");
                    });
            });
            */
            var deffered = $q.defer();
            $http.get($rootScope.rootUrl + '/api/organisationUnitGroups.json')
                .success(function(data){
                    for(var i = 0; i < data.organisationUnitGroups.length; i++){
                        if(data.organisationUnitGroups[i].name === name){
                            deffered.resolve(data.organisationUnitGroups[i].id);
                        }
                    }
                    deffered.reject("Unknown Unit");
                })
                .error(function(data, status, headers){
                    deffered.reject("Error: " + status);
                });
            return deffered.promise;
        },
        getStages: function (id) {
            return $resource($rootScope.rootUrl + '/api/programStages/' + id + '.json', {},
                {
                    query: {
                        isArray: false
                    }
                });
        },
        saveEvent: function() {
            return $resource($rootScope.rootUrl + '/api/events/');
        }
    }
});
