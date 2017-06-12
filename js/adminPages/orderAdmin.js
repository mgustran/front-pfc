/**
 * Created by mgustran on 12/06/2017.
 */

var app = angular.module('skeightApp', []);
app.controller('ordersController', function($scope, $http, $location, $sce) {

    $http.get("http://localhost:8080/orders/orders")
        .then(function(response) {
            $scope.ordersObj = angular.fromJson(response.data);
        });

    $scope.DeleteData = function (idparam) {

        $http.delete('http://localhost:8080/orders/order/' + idparam)
            .success(function (data, status, headers) {
                $scope.ServerResponse = data;
                location.reload();
            })
            .error(function (data, status, header, config) {
                $scope.ServerResponse = htmlDecode("Data: " + data +
                    "\n\n\n\nstatus: " + status +
                    "\n\n\n\nheaders: " + header +
                    "\n\n\n\nconfig: " + config);
            });
    };

});

$(function(){
    $('html, body').animate({
        scrollTop: $('#cart').offset().top
    }, 1000);
    return false;
});