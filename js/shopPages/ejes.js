/**
 * Created by mgustran on 12/06/2017.
 */
var app = angular.module('skeightApp', []);
app.controller('productsController', function($scope, $http) {
//        var productsObj;
    $http.get("http://localhost:8080/data/articles/ejes")
        .then(function(response) {
            $scope.productsObj = angular.fromJson(response.data);
            $scope.q = "";
        });

    $http.get("http://localhost:8080/cart/articles")
        .then(function(response) {
            $scope.product = response.data;
            $scope.cartProducts = angular.fromJson(response.data);
            $scope.cartNum = $scope.cartProducts.length;
        });
});

$(function(){
    $('html, body').animate({
        scrollTop: $('#ejes').offset().top
    }, 1000);
    return false;
});