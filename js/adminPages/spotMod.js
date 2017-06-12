/**
 * Created by mgustran on 12/06/2017.
 */

var app = angular.module('skeightApp', []);
app.controller('spotsController', function($scope, $http, $location, $sce) {

    $scope.parameters = $location.search("");
    var url = $scope.parameters.$$absUrl;
    if (url.includes("?")) {
        $scope.id = url.substring(url.indexOf('?') + 1);
        $scope.adding = false;
        if (url.includes('ok=true')) {
            $scope.putError = false;
        } else {
            $scope.putError = true;
        }
    } else {
        $scope.adding = true;
    }

    $http.get("http://localhost:8080/spots/spot/" + $scope.id)
        .then(function(response) {
            $scope.spotItem = angular.fromJson(response.data);
        });

    $scope.DeleteData = function (idparam) {

        $http.delete('http://localhost:8080/spots/spot/' + idparam)
            .success(function (data, status, headers) {
                $scope.ServerResponse = data;
                location.reload();
            })
            .error(function (data, status, header, config) {
                $scope.ServerResponse = htmlDecode("Data: " + data +
                    "\n\n\n\nstatus: " + status +
                    "\n\n\n\nheaders: " + header +
                    "\n\n\n\nconfig: " + config);
                location.href = location.href + '?ok=false'
            });
    };

    $scope.UpdateData = function (idParam) {
        var config = {
            headers : {
                'Content-Type': 'application/json'
            }
        };

        var spotIdStr = $scope.spotItem.spotId;
        var name = document.getElementById('name').value;
        var address = document.getElementById('address').value;
        var location = document.getElementById('location').value;
        var gmaps1 = document.getElementById('longitude').value;
        var gmaps2 = document.getElementById('latitude').value;
        var imagen = document.getElementById('image').value;

        $scope.productObj = {
            "spotId": spotIdStr,
            "name": name,
            "address": address,
            "location": location,
            "gmapsLocation1": gmaps1,
            "gmapsLocation2": gmaps2,
            "img": imagen
        };


        $http.put('http://localhost:8080/spots/spot', $scope.productObj, config)
            .success(function (data, status, headers) {
                $scope.ServerResponse = data;
            })
            .error(function (data, status, header, config) {
                $scope.deliberatelyTrustDangerousSnippet = function() {
                    location.href = location.href + '?ok=false';
                    location.reload();
                    return $sce.trustAsHtml("Data: " + data +
                        "\n\n\n\nstatus: " + status +
                        "\n\n\n\nheaders: " + header +
                        "\n\n\n\nconfig: " + config);
                };
                $scope.ServerResponse =  $scope.deliberatelyTrustDangerousSnippet();
                location.href = location.href + '?ok=false';
                location.reload();
            });
    };

    $scope.SendData = function () {

        var config = {
            headers : {
                'Content-Type': 'application/json'
            }
        };

        var name = document.getElementById('name').value;
        var address = document.getElementById('address').value;
        var location = document.getElementById('location').value;
        var gmaps1 = document.getElementById('longitude').value;
        var gmaps2 = document.getElementById('latitude').value;
        var imagen = document.getElementById('image').value;

        $scope.productDataObj = {
            "name": name,
            "address": address,
            "location": location,
            "gmapsLocation1": gmaps1,
            "gmapsLocation2": gmaps2,
            "img": imagen
        };

        $http.post('http://localhost:8080/spots/spot', $scope.productDataObj, config)
            .success(function (data, status, headers, config) {
                $scope.PostDataResponse = data;
                location.href = location.href + '?ok=true';
            })
            .error(function (data, status, header, config) {
                $scope.ResponseDetails = "Data: " + data +
                    "<hr />status: " + status +
                    "<hr />headers: " + header +
                    "<hr />config: " + config;
                location.href = location.href + '?ok=false';

            });
    }

});

$(function(){
    $('html, body').animate({
        scrollTop: $('#cart').offset().top
    }, 1000);
    return false;
});