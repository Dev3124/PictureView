var app = angular.module("myApp", []);
app.controller("myController", function ($scope, $http) {
    var request = {
        method: "get",
        url: "https://ac.aws.citizennet.com/assets/qspreviews/qs_interview_data.json",
        dataType: "json",
        contentType: "application/json",
    };
    $scope.data = new Array();

    $http(request)
        .success(function (jsonData) {
            $scope.data = jsonData.data.sort(
                (a, b) =>
                    a.source_items.audience_size > b.source_items.audience_size
            );
        })
        .error(function () {});
});
app.directive("onErrorSrc", function () {
    return {
        link: function (scope, element, attrs) {
            element.bind("error", function () {
                if (attrs.src != attrs.onErrorSrc) {
                    attrs.$set("src", attrs.onErrorSrc);
                }
            });
        },
    };
});
