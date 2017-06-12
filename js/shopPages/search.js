/**
 * Created by mgustran on 12/06/2017.
 */
var app = angular.module('myApp', []);
app.controller('productsController', function($scope, $http, $location) {
//        var productsObj;
    $scope.parameters = $location.search('search');
    $scope.search = '';
//        $scope.filtersA = 'price';
    var urlString = $scope.parameters.$$absUrl;
    $scope.isSubmit = urlString.includes("submit");
    $scope.notInBlank = urlString.includes("=");
    var search;
    if ($scope.isSubmit) {
        search = urlString.substring(urlString.indexOf('=') + 1, urlString.indexOf('&'));
    } else if($scope.notInBlank) {
        $scope.search = urlString.substring(urlString.indexOf('=') + 1, urlString.indexOf('#'));
    } else {
        $scope.search = "";
    }
    $http.get("http://localhost:8080/data/articles")
        .then(function(response) {
            $scope.productsObj = angular.fromJson(response.data);
            $scope.num = document.getElementsByClassName('product').childElementCount;
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
        scrollTop: $('#search-container').offset().top
    }, 1000);
    return false;
});