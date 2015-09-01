(function () {

    'use strict';

    angular
        .module('neofen.controllers')
        .controller('MyFirstController', MyFirstController);

    MyFirstController.$inject = ['$scope', '$log', 'navigationUtil', 'localStorageService', '$ionicHistory', '$ionicPopup'];

    function MyFirstController($scope, $log, navigationUtil, localStorageService, $ionicHistory, $ionicPopup) {

        var vm = this;
        
        // variables
        vm.navigate = navigationUtil.navigate;
        vm.myfirst = {};
        vm.data = [];

        vm.datepickerNowObject = {
            titleLabel: 'Datum',
            inputDate: null,
            from: new Date(new Date() - 86700000), // day before today
            callback: function (val) {
                datePickerNowCallback(val);
            }
        };
        
        // functions
        vm.save = save;
        
        init();
        
        function init() {
            var data = localStorageService.getDataByKey('myfirst');
            vm.data = (data && data instanceof Array) ? data : [];
        }
        
        function save() {
           if (!vm.myfirst.title) {
                $ionicPopup.alert({
                    title: 'Moj prvi...',
                    template: 'Molimo vas unesite naslov u polje Moj Prvi...'
                });
                return;
            }
             
            if(!vm.data) {
                $log.error('vm.data is not defined, myfirst.controller ' + vm.data);
                return;
            }
            
            vm.myfirst.date = vm.datepickerNowObject.inputDate;
            vm.data.push(vm.myfirst);
            
            localStorageService.syncCdmByKeyValue('myfirst', vm.data);
            $ionicHistory.goBack();
        }
        
        
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