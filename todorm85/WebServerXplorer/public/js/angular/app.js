(function () {
    'use strict';

    angular.module('myApp.services', []);
    angular.module('myApp.controllers', ['myApp.services']);
    angular.module('myApp', ['myApp.controllers'])
        .constant('baseServiceUrl', 'http://localhost:3000');
}());