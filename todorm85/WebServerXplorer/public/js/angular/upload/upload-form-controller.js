(function () {
    // 'use strict';

    function UploadController() {
        var vm = this;

        vm.addFile = function () {
            var form = angular.element(document).find('form');
            var count = form.children('input[type="file"]').length;

            var inputTypeFile = angular.element('<input />');
            inputTypeFile.attr('type', 'file');
            inputTypeFile.attr('name', `file_${count}`);

            form.prepend(angular.element('<br />'))
                .prepend(angular.element('<br />'))
                .prepend(inputTypeFile);
        };
    }

    angular.module('myApp.controllers')
        .controller('UploadController', [UploadController]);
}());
