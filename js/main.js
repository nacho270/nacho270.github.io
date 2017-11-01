var app = angular.module("contents",  ['ngSanitize']);
app.controller("contentsController", function($scope, $http) {
    let rand = new Date().getTime();
    $http.get(`contents.json?r=${rand}`).then(function(response) {
        $scope.entries = response.data;
    });
    $http.get(`cv.json?r=${rand}`).then(function(response) {
        $scope.cv = response.data;
    });
});