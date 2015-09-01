(function () {

    'use strict';

    angular
        .module('neofen.controllers')
        .controller('MyFirstController', MyFirstController);

    MyFirstController.$inject = ['$scope', '$log', 'navigationUtil'];

    function MyFirstController($scope, $log, navigationUtil) {

        var vm = this;

        vm.navigate = navigationUtil.navigate;
        vm.key = navigationUtil.getNavigationParam();

        vm.datepickerNowObject = {
            titleLabel: 'Datum',
            inputDate: null,
            from: new Date(new Date() - 86700000), // day before today
            callback: function (val) {
                datePickerNowCallback(val);
            }
        };

        function datePickerNowCallback(val) {
            if (typeof (val) === 'undefined') {
                $log.error('No date selected');
            } else {
                // sending the whole object ( refference ) and so the digest circle update
                vm.datepickerNowObject.inputDate = val;
            }
        }

    }

})();