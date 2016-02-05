(function () {
    'use strict';

    function statistics($q, data) {

        function getStatistics() {
            return data.get('statistics');
        }

        return {
            getStatistics
        };
    }

    angular.module('myApp.services')
        .factory('statistics', ['$q', 'data', statistics]);
}());