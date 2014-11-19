'use strict';

angular.module('myApp.startView', ['ngRoute'])

    .config(['$routeProvider', function($routeProivder) {
        $routeProivder.when('/startView', {
            templateUrl: 'startView/startPage.html',
            controller: 'startController'
        });
    }])


    .controller("startController", function($scope, $http) {
        $scope.checkboxes = [];

        initPage();

        $scope.getProg = function() {
            console.log($scope.program.id);
            console.log($scope.country.id);
        };

        $scope.getValues = function() {
            console.log($scope.program.name);
            console.log($scope.country.name);
        };

        $scope.getDistricts = function() {
            getOrganisationUnitChildren($scope.country.id, "district");

        };

        $scope.getChiefdoms = function() {
            getOrganisationUnitChildren($scope.district.id, "chiefdom");
        };

        $scope.getClinics = function() {
            //getClinics();
            getOrganisationUnitChildren($scope.chiefdom.id, "clinic");
        };

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

        function getCountries() {
            //TODO url to Country is hardcoded
            $http.get('http://inf5750-20.uio.no/api/organisationUnitGroups/RpbiCJpIYEj.json')
                .success(function(data, status, headers) {
                    console.log("Got Countries")
                    $scope.countries = data.organisationUnits;
                    $scope.country = $scope.countries[0];
                })
                .error(function(error) {
                    console.log("Error getting countries");
                    console.log(error);
                });
        }

        function getOrganisationUnitChildren(id, organisationType) {
            $http.get('http://inf5750-20.uio.no/api/organisationUnits/'+id+'.json')
                .success(function(data, status, headers) {
                    console.log("Got OrganisationUnit")
                    setDataToCorrectType(data, organisationType);
                })
                .error(function(error) {
                    console.log("Error getting organisationUnit");
                    console.log(error);
                });
        }

        //function getClinics() {
        //   $http.get('http://inf5750-20.uio.no/api/organisationUnitGroups/RXL3lPSK8oG.json')
        function getClinic(id) {
            $http.get('http://inf5750-20.uio.no/api/organisationUnits/'+id+'.json')
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

        function setDataToCorrectType(data, organisationType) {
            if(organisationType == "district") {
                $scope.districts = data.children;
                $scope.district = $scope.districts[0];
            } else if(organisationType == "chiefdom") {
                $scope.chiefdoms = data.children;
                $scope.chiefdom = $scope.chiefdoms[0];
            } else if(organisationType == "clinic") {
                $scope.clinics = data.children;
                $scope.clinic = $scope.clinics[0];
            }
        }

        function initPage() {
            getPrograms();
            getCountries();
            //getClinics();
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
        }
    });