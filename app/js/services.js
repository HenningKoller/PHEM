var myApp = angular.module('myApp', []);

myApp.controller("myController", function($scope, $http) {
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

    function getClinic(id) {
        $http.get('http://inf5750-20.uio.no/api/organisationUnits/'+id+'.json')
            .success(function(data, status, headers) {
                console.log("Got clinic")

            })
            .error(function(error) {
                console.log("Error getting clinic");
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
    }

});

myApp.controller("myTestController", function($scope) {
	$scope.countries = ["Norway","Sweeden","Finland"];
	$scope.district = ["Akershus","Oslo","Vest-Agder", "Aust-Agder"];
});


myApp.controller("myJsonReader", function($scope, $http) {
    $http.get("testdata.json")
    .success(function(response) {$scope.variables = response;});
});
