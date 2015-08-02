(function () {

    'use strict';

    angular
        .module('neofen.controllers')
        .controller('CalendarController', CalendarController);

    CalendarController.$inject = ['$scope', '$log', '$rootScope'];

    function CalendarController($scope, $log, $rootScope) {

        var vm = this;
        
        vm.dateFrom = null;
        vm.dateTo = null;
        vm.timeTo = null;
        vm.timeFrom = null;
        
        vm.submitDate = submitDate;
        
        function submitDate() {
            
        }
        
    }

})();