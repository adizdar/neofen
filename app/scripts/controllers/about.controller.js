(function () {

    'use strict';

    angular
        .module('neofen.controllers')
        .controller('AboutController', AboutController);

    AboutController.$inject = ['$scope', '$log', 'navigationUtil', 'localStorageService', '$ionicModal', '$ionicPopup', 'aboutDataContextFactory', '$ionicViewSwitcher'];

    function AboutController($scope, $log, navigationUtil, localStorageService, $ionicModal, $ionicPopup, aboutDataContextFactory, $ionicViewSwitcher) {

        var vm = this;
        var category = navigationUtil.getNavigationParam();

        // Variables decleraion
        vm.navigate = navigationUtil.navigate;
        vm.formData = aboutDataContextFactory.getFormData(category);
        vm.data = [];
        vm.showDelete = false;
        vm.modal = null;
        vm.newTask = {};

        vm.datepickerNowObject = {
            titleLabel: 'Datum',
            inputDate: null,
            from: new Date(new Date() - 86700000), // day before today
            callback: function (val) {
                datePickerNowCallback(val);
            }
        };
        vm.datepickerNewObject = {
            titleLabel: 'Datum',
            inputDate: null,
            from: new Date(new Date() - 86700000), // day before today
            callback: function (val) {
                datePickerNewCallback(val);
            }
        };

        // Function decleration
        vm.addNewTask = addNewTask;
        vm.saveTask = saveTask;
        vm.closeModal = closeModal;
        vm.deleteTask = deleteTask;
        vm.editTask = editTask;

        init();

        function init() {
            // @todo: create enum for data context keys
            var tempData = localStorageService.getDataByKey('about');

            if(!tempData) {
                localStorageService.createObjectByKey('about');
            }

            if (tempData && category) {
                vm.data = tempData[category] || [];
            }
            // $ionicViewSwitcher.nextTransition('none');

            // modal init
            $ionicModal.fromTemplateUrl(vm.formData.templateUrl, {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                vm.modal = modal;
            });
        }

        // Modal functions
        function addNewTask() {
            vm.modal.show();
        }

        function editTask(task) {
            vm.newTask = task;
            vm.datepickerNowObject.inputDate = task.dateNow;
            vm.datepickerNewObject.inputDate = task.dateNew;

            vm.modal.show();
        }

        function saveTask() {
            if (!vm.newTask.title) {
                $ionicPopup.alert({
                    title: 'Novi unos',
                    template: 'Molimo vas unesite naslov'
                });
                return;
            }

            // merge properties to newTask object
            vm.newTask.dateNow = vm.datepickerNowObject.inputDate;
            vm.newTask.dateNew = vm.datepickerNewObject.inputDate;

            vm.data.indexOf(vm.newTask) === -1 && vm.data.push(vm.newTask);
            localStorageService.syncObjectByKeyValue(localStorageService.getDataByKey('about'), category, vm.data);

            closeModal();
        }

        function closeModal() {
            // clear data
            vm.newTask = {};
            vm.datepickerNowObject.inputDate = null;
            vm.datepickerNewObject.inputDate = null;

            vm.modal.hide();
        }

        function deleteTask(task) {
            var index = vm.data.indexOf(task);

            vm.data.splice(index, 1);
            localStorageService.syncObjectByKeyValue(localStorageService.getDataByKey('about'), vm.category, vm.data);
        }

        // Date picker callbacks
        function datePickerNowCallback(val) {
            setDate(vm.datepickerNowObject, val);
        }

        function datePickerNewCallback(val) {
            setDate(vm.datepickerNewObject, val);
        }

        function setDate(dateObject, val) {
            if (typeof (val) === 'undefined') {
                $log.error('No date selected');
            } else {
                // sending the whole object ( refference ) and so the digest circle update
                dateObject.inputDate = val;
            }
        }

        // Cleanup the modal when we're done with it
        $scope.$on('$destroy', function () {
            vm.modal.remove();
        });

    }

})();
