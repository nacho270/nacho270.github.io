var app = angular.module("contents", []);
app.controller("contentsController", function($scope, $http) {
    $http.get("contents.json").then(function(response) {
        $scope.entries = response.data;
    });
});