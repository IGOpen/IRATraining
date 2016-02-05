(function () {
    'use strict';

    function StatisticsController(statistics) {
        var vm = this;

        vm.loadStatistics = function () {
            statistics.getStatistics()
                .then(function (stats) {
                    vm.stats = stats;
                });
        };

        vm.loadStatistics();
    }

    angular.module('myApp.controllers')
        .controller('StatisticsController', ['statistics', StatisticsController]);
}());