(function () {

    'use strict';

    angular
        .module('neofen.controllers')
        .controller('MyFirstController', MyFirstController);

    MyFirstController.$inject = ['$scope', '$log', 'navigationUtil', 'localStorageService', '$ionicHistory', '$ionicPopup', 'pictureService', '$ionicPlatform'];

    function MyFirstController($scope, $log, navigationUtil, localStorageService, $ionicHistory, $ionicPopup, pictureService, $ionicPlatform) {

        var vm = this;
        var param = navigationUtil.getNavigationParam();
        var originalParam = param ? angular.copy(param) : null;
        
        // variables
        vm.myfirst = {};
        vm.data = [];

        vm.datepickerNowObject = {
            titleLabel: 'Datum',
            inputDate: null,
            callback: function (val) {
                datePickerNowCallback(val);
            }
        };
        
        // functions
        vm.save = save;
        vm.goBack = goBack;
        vm.choosePicture = choosePicture;

        init();

        function init() {
            var data = localStorageService.getDataByKey('myfirst');
            vm.data = (data && data instanceof Array) ? data : [];

            if (param) {
                vm.myfirst = param;
                vm.datepickerNowObject.inputDate = vm.myfirst.date ? new Date(vm.myfirst.date) : null; // casting back to date
            }
        }

        function save() {
            if (!vm.myfirst.title) {
                $ionicPopup.alert({
                    title: 'Moj prvi...',
                    template: 'Molimo vas unesite naslov u polje Moj Prvi...'
                });
                return;
            }

            if (!vm.data) {
                $log.error('vm.data is not defined, myfirst.controller ' + vm.data);
                return;
            }

            vm.myfirst.date = vm.datepickerNowObject.inputDate;
            vm.data.indexOf(vm.myfirst) === -1 && vm.data.push(vm.myfirst);

            localStorageService.syncCdmByKeyValue('myfirst', vm.data);

            $ionicPopup.alert({
                title: 'Moj prvi...',
                template: 'Novi unos zapisan. Na stranici "Pregledaj", možete ga pogledati i mjenjati.'
            });

            $ionicHistory.goBack();
        }

        function choosePicture() {
            pictureService.getPicture().then(function (imgData) {
                if (imgData) {
                    vm.myfirst.image = imgData;
                }
            }, function (err) {
                $log.error(err);
            });
        }

        function datePickerNowCallback(val) {
            if (typeof (val) === 'undefined') {
                $log.error('No date selected');
            } else {
                vm.datepickerNowObject.inputDate = val;
            }
        }
             
        // OVERRIDE BACK BUTTON
        $ionicPlatform.onHardwareBackButton(function () {
            event.preventDefault();
            event.stopPropagation();
            triggerBack();
        });

        function goBack() {
            triggerBack();
        }
        
        // because we don't want to update if the user goes back
        // in case of edit mode
        // @todo: chnage with modal so we cant discard this behafior
        // bad solution, don't have time to change it with modal
        function triggerBack() {

            if (originalParam) {
                vm.myfirst.title = originalParam.title;
                vm.myfirst.date = originalParam.date;
                vm.myfirst.description = originalParam.description;
            }

            $ionicHistory.goBack();
        }

    }

})();