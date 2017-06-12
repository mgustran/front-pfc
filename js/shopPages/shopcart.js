/**
 * Created by mgustran on 12/06/2017.
 */
var app = angular.module('skeightApp', []);
app.controller('productsController', function($scope, $http, $location, $sce) {

    $scope.totalPrice = 0;
    $scope.totalTax = 0;
    $scope.shipTax = 5;
    $scope.quantitiesStr = "";

    $http.get("http://localhost:8080/cart/articles")
        .then(function(response) {
            $scope.productsObj = angular.fromJson(response.data);
            $scope.q = "";
            $scope.cartNum = $scope.productsObj.length;

            _.forEach($scope.productsObj, function (item) {
                var quantityString = $scope.quantitiesStr;
                $scope.totalPrice += (item.quantity * item.price);
                $scope.totalTax += ($scope.shipTax * item.quantity);
                var quantityString2 = (item.model + ' by ' + item.marca + ' - ' + item.quantity + ', ');
                $scope.quantitiesStr = quantityString.concat(quantityString2);
            })
        });

    $scope.GetProduct = function (model) {

        $http.get("http://localhost:8080/data/articles")
            .then(function(response) {
                $scope.dataProducts = angular.fromJson(response.data);
                $scope.matchingProducts = _.filter($scope.dataProducts, ['model', model]);
                $scope.idDataParam = $scope.matchingProducts[0].articleId;
                location.href = "productdetail.html?" + $scope.idDataParam;
            });



    };


    $scope.DeleteData = function (idparam) {

        $scope.idparam = idparam;

        $http.delete('http://localhost:8080/cart/article/' + $scope.idparam)
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

    $scope.UpdateData = function (idParam, type) {
        var config = {
            headers : {
                'Content-Type': 'application/json'
            }
        };

        $http.get("http://localhost:8080/cart/article/" + idParam)
            .then(function(response) {
                $scope.product = angular.fromJson(response.data);
                $scope.product.quantity = $scope.product.quantity + (type);

                if ($scope.product.quantity !== 0 ) {
                    $http.put('http://localhost:8080/cart/article', $scope.product, config)
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
                    location.reload();


                } else {
                    $http.delete('http://localhost:8080/cart/article/' + idParam)
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
                }

            });
    };

    $scope.SendOrder = function () {

        var config = {
            headers : {
                'Content-Type': 'application/json'
            }
        };

        var name = document.getElementById('name').value;
        var secondName = document.getElementById('secondName').value;
        var email = document.getElementById('email').value;
        var ccard = 987654321654;
        var cvc = 797;
        var monthCard = 08;
        var yearCard = 1996;
        var address = document.getElementById('address').value;
        var location = document.getElementById('location').value;
        var country = document.getElementById('country').value;
        var postalCode = document.getElementById('postalCode').value;
//            var quantities = document.getElementById('quantities').value;
//            var totalPrice = document.getElementById('totalPrice').value;
//            var totalTax = document.getElementById('totalTax').value;

        $scope.productDataObj = {
            "name": name,
            "secondName": secondName,
            "email": email,
            "ccard": ccard,
            "cvc": cvc,
            "monthCard": monthCard,
            "yearCard": yearCard,
            "address": address,
            "location": location,
            "country": country,
            "postalCode": postalCode,
            "quantities": $scope.quantitiesStr,
            "totalPrice": $scope.totalPrice,
            "totalTax": $scope.totalTax
        };

        $http.post('http://localhost:8080/orders/order', $scope.productDataObj, config)
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

$( "#deleteBtn" ).click(function() {
    location.reload();

});