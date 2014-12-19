'use strict';

var appServices = angular.module('appServices', ['ngResource']);

appServices.factory('apiServices', function ($resource, $rootScope) {


        var xhReq = new XMLHttpRequest();
        xhReq.open("GET", "manifest.webapp", false);
        xhReq.send(null);

        var serverResponse = JSON.parse(xhReq.responseText);
        $rootScope.rootUrl = serverResponse.activities.dhis.href;

        return {
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
            getOrganisationUnitGroups: function () {
                return $resource($rootScope.rootUrl + '/api/organisationUnitGroups.json', {},
                    {
                        query: {
                            isArray: false
                        }
                    });
            }
        }
    });