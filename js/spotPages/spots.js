/**
 * Created by mgustran on 12/06/2017.
 */
angular.module('appMaps', ['uiGmapgoogle-maps'])
    .controller('mainCtrl', function($scope, $http, $location) {

        $scope.openD = false;

        $scope.parameters = $location.search("");
        var url = $scope.parameters.$$absUrl;
        if (url.includes('?')) {
            $scope.showDetail = true;
            $scope.id = url.substring(url.indexOf('?') + 1, url.indexOf('#'));

            $http.get("http://localhost:8080/spots/spot/" + $scope.id)
                .then(function(response) {
                    $scope.spotDetail = angular.fromJson(response.data);
                    $scope.showDetail = true;
                    $(function(){
                        $('html, body').animate({
                            scrollTop: $('#spot-detail').offset().top
                        }, 1000);
                        return false;
                    });
                    $scope.map = {
                        center: {
                            latitude: $scope.spotDetail.gmapsLocation1,
                            longitude: $scope.spotDetail.gmapsLocation2
                        },
                        zoom: 17
                    };
                });

        } else {
            $scope.map = {
                center: {
                    latitude: 39.576970,
                    longitude: 2.648834
                },
                zoom: 13
            };
        }


        $scope.GetSpot = function (spotIda) {


            $http.get("http://localhost:8080/spots/spot/" + spotIda)
                .then(function(response) {
                    $scope.spotDetail = angular.fromJson(response.data);
                });
        };

        $http.get("http://localhost:8080/spots/spots")
            .then(function(response) {
                $scope.spotsList = angular.fromJson(response.data);
                $scope.coordsList = [];
                coord1 = $scope.spotsList[0].gmapsLocation1;
                coord2 = $scope.spotsList[0].gmapsLocation2;

                _.forEach($scope.spotsList, function (item) {
                    var coord = {
                        "latitude": item.gmapsLocation1,
                        "longitude": item.gmapsLocation2
                    };
                    $scope.coordsList.push(coord);
                });


            });
        $( "#show-btn" ).click(function() {
            if($scope.openD) {
                $("#read-more").css({
                    "height":"0",
                    "display":"inline-block",
                }).show().animate({height:150})
            } else {
                $("#read-more").css({
                    "height":"0",
                    "display":"inline-block",
                }).hide().animate({height:125})
            }
            $scope.openD = !$scope.openD;
        });
    });

$(function(){
    $('html, body').animate({
        scrollTop: $('#spots').offset().top
    }, 1000);
    return false;
});