var myApp = angular.module('myApp', []);

myApp.controller("formController", function($scope, $http) {

    $scope.artifacts = {};
    var dataElementGroup;

    getDataElementGroup();
    $scope.getData = function () {
        console.log("Test data");
        parseDataElement(dataElementGroup);
    };


    function getDataElementGroup() {
        $http.get("http://inf5750-20.uio.no/api/dataElementGroups/vV9GQdbCS0B.json")
            .success(function (data, status, headers) {
                console.log("Got OrganisationUnit")
                dataElementGroup = data.dataElements;
            })
            .error(function (error) {
                console.log("Error getting organisationUnit");
                console.log(error);
            });
    }

    function parseDataElement(data) {
        for (var i = 0; i < data.length; i++) {
            var dataName = data[i].name.split("_");
            if(dataName[0] in $scope.artifacts) {
                $scope.artifacts[dataName[0]].row.push(dataName[1]);
            } else {
                $scope.artifacts[dataName[0]] = {row: [dataName[1]]};
            }
        }
    }


    
    var testData = [
        {
            "id": 0,
            "name": "DB_age",
            "price": "$0"
        },
        {
            "id": 1,
            "name": "DB_sex",
            "price": "$1"
        },
        {
            "id": 2,
            "name": "Jrnl_age",
            "price": "$2"
        },
        {
            "id": 3,
            "name": "Jrnl_sex",
            "price": "$3"
        },
        {
            "id": 4,
            "name": "Reg_age",
            "price": "$4"
        },
        {
            "id": 5,
            "name": "Reg_sex",
            "price": "$5"
        } ,
        {
            "id": 5,
            "name": "Reg_height",
            "price": "$5"
        }
    ]

});