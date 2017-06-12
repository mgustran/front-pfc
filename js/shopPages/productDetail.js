/**
 * Created by mgustran on 12/06/2017.
 */
var app = angular.module('skeightApp', []);
app.controller('productsController', function($scope, $http, $location, $sce) {
//        var productsObj;
    $scope.parameters = $location.search("");
    $scope.openD = false;
    var url = $scope.parameters.$$absUrl;
    $scope.id = url.substring(url.indexOf('?') + 1);

    $http.get("http://localhost:8080/data/article/" + $scope.id)
        .then(function(response) {
            $scope.dataObj = response.data;
//                $scope.dataToPost =
//                angular.uns
            delete $scope.dataObj.articleId;
            $scope.dataObj.quantity = 1;
            $scope.product = angular.fromJson(response.data);
            $scope.q = "";

        });

    $http.get("http://localhost:8080/cart/articles")
        .then(function(response) {
            $scope.products = response.data;
            $scope.cartProducts = angular.fromJson(response.data);
            $scope.cartNum = $scope.cartProducts.length;
        });

    $scope.SendData = function () {
        // use $.param jQuery function to serialize data from JSON
////                if(_.findKey($scope.cartProducts, ['model', $scope.product.model]).equals($scope.))
//
        var config = {
            headers : {
                'Content-Type': 'application/json'
            }
        };

        $http.get("http://localhost:8080/cart/articles")
            .then(function(response) {
                $scope.products = response.data;
                $scope.cartProducts = angular.fromJson(response.data);
                $scope.cartNum = $scope.cartProducts.length;
            });

        $scope.matchingProducts = _.filter($scope.cartProducts, ['model', $scope.product.model]);
        if ($scope.matchingProducts.length > 0) {
            $scope.dataObj.quantity = $scope.matchingProducts[0].quantity + 1;
            $scope.dataObj.articleId = $scope.matchingProducts[0].articleId;

            $http.put('http://localhost:8080/cart/article', $scope.dataObj, config)
                .success(function (data, status, headers) {
                    $scope.ServerResponse = data;
                })
                .error(function (data, status, header, config) {
                    $scope.deliberatelyTrustDangerousSnippet = function() {
                        return $sce.trustAsHtml("Data: " + data +
                            "\n\n\n\nstatus: " + status +
                            "\n\n\n\nheaders: " + header +
                            "\n\n\n\nconfig: " + config);
                    };
                    $scope.ServerResponse =  $scope.deliberatelyTrustDangerousSnippet();
                });

        } else {

            $http.post('http://localhost:8080/cart/article', $scope.dataObj, config)
                .success(function (data, status, headers, config) {
                    $scope.PostDataResponse = data;
                })
                .error(function (data, status, header, config) {
                    $scope.ResponseDetails = "Data: " + data +
                        "<hr />status: " + status +
                        "<hr />headers: " + header +
                        "<hr />config: " + config;
                });
        }
    };

    $( "#buy" ).click(function() {
        location.reload();

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
        scrollTop: $('#product-detail').offset().top
    }, 1000);
    return false;
});