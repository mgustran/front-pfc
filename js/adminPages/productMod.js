/**
 * Created by mgustran on 12/06/2017.
 */
var app = angular.module('skeightApp', []);
app.controller('productsController', function($scope, $http, $location, $sce) {

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

    $http.get("http://localhost:8080/data/article/" + $scope.id)
        .then(function(response) {
            $scope.productItem = angular.fromJson(response.data);
            var discount = $scope.productItem.discount.substring(0, 2);
            $scope.productItem.discount = Number(discount);
        });

    $scope.DeleteData = function (idparam) {

        $http.delete('http://localhost:8080/data/article/' + idparam)
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

        var articleIdStr = $scope.productItem.articleId;
        var model = document.getElementById('model').value;
        var marca = document.getElementById('marca').value;
        var categoria = document.getElementById('category').value;
        var precio = document.getElementById('price').value;
        var descripcion = document.getElementById('description').value;
        var descuento = (document.getElementById('discount').value).toString() + '%';
        var talla = document.getElementById('talla').value;
        var imagen = document.getElementById('image').value;

        $scope.productObj = {
            "articleId": articleIdStr,
            "model": model,
            "marca": marca,
            "category": categoria,
            "price": precio,
            "description": descripcion,
            "discount": descuento,
            "talla": talla,
            "img": imagen
        };


        $http.put('http://localhost:8080/data/article', $scope.productObj, config)
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
    }

    $scope.SendData = function () {
        // use $.param jQuery function to serialize data from JSON
////                if(_.findKey($scope.cartProducts, ['model', $scope.product.model]).equals($scope.))
//
        var config = {
            headers : {
                'Content-Type': 'application/json'
            }
        };

        var model = document.getElementById('model').value;
        var marca = document.getElementById('marca').value;
        var categoria = document.getElementById('category').value;
        var precio = document.getElementById('price').value;
        var descripcion = document.getElementById('description').value;
        var descuento = (document.getElementById('discount').value).toString() + '%';
        var talla = document.getElementById('talla').value;
        var imagen = document.getElementById('image').value;

        $scope.productDataObj = {
            "model": model,
            "marca": marca,
            "category": categoria,
            "price": precio,
            "description": descripcion,
            "discount": descuento,
            "talla": talla,
            "img": imagen
        };

        $http.post('http://localhost:8080/data/article', $scope.productDataObj, config)
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
        scrollTop: $('#product-detail-mod').offset().top
    }, 1000);
    return false;
});