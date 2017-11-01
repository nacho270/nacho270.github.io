var app = angular.module("contents",  ['ngSanitize']);
app.controller("contentsController", function($scope, $http) {
    let rand = new Date().getTime();
    $http.get(`contents.json?r=${rand}`).then(function(response) {
        $scope.entries = response.data;
    });
    $http.get(`cv.json?r=${rand}`).then(function(response) {
        $scope.cv = response.data;
    });
    $scope.changeModal = function(title, body){
        $("#myModal .modal-title").html(title);
        $("#myModal .modal-body").html(body);
      };
});

app.filter('cut', function () {
    return function (value, wordwise, max, tail) {
        if (!value) return '';
        max = parseInt(max, 10);
        if (!max) return value;
        if (value.length <= max) return value;
        value = value.substr(0, max);
        if (wordwise) {
            var lastspace = value.lastIndexOf(' ');
            if (lastspace !== -1) {
              if (value.charAt(lastspace-1) === '.' || value.charAt(lastspace-1) === ',') {
                lastspace = lastspace - 1;
              }
              value = value.substr(0, lastspace);
            }
        }
        return value + (tail || ' …');
    };
});