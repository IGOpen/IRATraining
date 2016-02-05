(function () {
    'use strict';

    function data($http, baseServiceUrl) {

        function get(url, queryParams) {
            return $http.get(baseServiceUrl + '/' + url, { params: queryParams})
                .then(function (response) {
                    return response.data;
                });
        }

        return {
            get
        };
    }

    angular.module('myApp.services')
        .factory('data', ['$http', 'baseServiceUrl', data]);
}());