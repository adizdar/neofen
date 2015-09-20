(function () {

    'use strict';

    angular
        .module('neofen.controllers')
        .controller('AboutMeAddEditController', AboutMeAddEditController);

    AboutMeAddEditController.$inject = ['$scope', '$log', 'navigationUtil', 'localStorageService', '$ionicPopup', '$ionicHistory', '$ionicModal'];

    function AboutMeAddEditController($scope, $log, navigationUtil, localStorageService, $ionicPopup, $ionicHistory, $ionicModal) {

        var vm = this;

        // Variables decleraion
        vm.item = {};
        vm.data = [];

        vm.profile = {
            image: 'images/camera.png',
            name: null,
            defaultValues: true
        };

        vm.datepickerNowObject = {
            titleLabel: 'Datum',
            inputDate: null,
            callback: function (val) {
                datePickerNowCallback(val);
            }
        };

        // Functions
        vm.navigate = navigationUtil.navigate;
        vm.closeModal = closeModal;
        vm.save = save;
        vm.add = add;
        vm.edit = edit;
        vm.deleteItem = deleteItem;

        init();

        function init() {
            var tempData = localStorageService.getDataByKey('aboutMe');

            if(!(vm.data = tempData)) {
                 vm.data = [];
                 localStorageService.createArrayByKey('aboutMe');
            }

            // modal init
            $ionicModal.fromTemplateUrl('templates/modal-about-me-add.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                vm.modal = modal;
            });

        }

        function add() {
            vm.item = {};
            vm.datepickerNowObject.inputDate = null;

            vm.modal.show();
        }

        function closeModal() {
            vm.modal.hide();
        }

        function save() {
            vm.item.date = vm.datepickerNowObject.inputDate;

            if (!vm.item.date) {
                $ionicPopup.alert({
                    title: 'Novi unos',
                    template: 'Molimo vas unesite datum u polje "Datum".'
                });
                return;
            }

            vm.data.indexOf(vm.item) === -1 && vm.data.push(vm.item);
            localStorageService.syncCdmByKeyValue('aboutMe', vm.data);

            closeModal();
        }

        function datePickerNowCallback(val) {
            if (typeof (val) === 'undefined') {
                $log.error('No date selected');
            } else {
                vm.datepickerNowObject.inputDate = val;
            }
        }

        function edit(item) {
            vm.item = item;
            vm.datepickerNowObject.inputDate = item.date;
            vm.modal.show();
        }

        function deleteItem(item) {
            var index = null;

            if(!vm.data) {
                $log.error('vm.data is not defined in aboutme.addedit.controller -> deleteItem');
                return;
            }

            if((index = vm.data.indexOf(item)) === -1) {
                $log.error('index is not defined in aboutme.addedit.controller -> deleteItem');
                return;
            }

            vm.data.splice(index,1);
            localStorageService.syncCdmByKeyValue('aboutMe', vm.data);
        }

        // Cleanup the modal when we're done with it
        $scope.$on('$destroy', function () {
            vm.modal.remove();
        });

    }

})();
