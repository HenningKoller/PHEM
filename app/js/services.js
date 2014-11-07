function getPrograms($http) {
    $http.get('http://inf5750-20.uio.no/api/programs.json')
        .success(function(data, status, headers) {
            console.log("Got programs")
            return data.programs;

        })
        .error(function(error) {
            console.log("Error getting programs");
            console.log(error);
        });
}

function getOrgUnits($http) {
    $http.get('http://inf5750-20.uio.no/api/programs.json')
        .success(function(data, status, headers) {
            console.log("Got orgUnits")
            return data.organisationUnits;

        })
        .error(function(error) {
            console.log("Error getting orgUnits");
            console.log(error);
        });
}

