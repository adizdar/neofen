(function () {

    'use strict';

    angular
        .module('neofen.controllers')
        .controller('AboutController', AboutController);

    AboutController.$inject = ['$scope', '$log', 'navigationUtil', 'localStorageService', '$ionicModal'];

    function AboutController($scope, $log, navigationUtil, localStorageService, $ionicModal) {

        var vm = this;

        vm.navigate = navigationUtil.navigate;
        vm.key = navigationUtil.getNavigationParam();
        vm.test = ['test1', 'test2', 'test3'];
        vm.category = navigationUtil.getNavigationParam();
        vm.data = null;
        vm.showDelete = false;
        vm.modal = null;
        vm.datepickerObject = {
              titleLabel: 'Datum',
              inputDate: new Date(),
              from: new Date(new Date()-86700000), // day before today
              callback: function (val) {  
                 datePickerCallback(val);
              }     
        };
        
        vm.add = add;
        vm.closeModal = closeModal;

        init();

        function init() {
            var tempData = localStorageService.getDataByKey('about');
            var param = navigationUtil.getNavigationParam();

            if (tempData && param) {
                vm.datas = tempData[param];
            }
            
            // modal init
            $ionicModal.fromTemplateUrl('templates/tab-about-modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                vm.modal = modal;
            });
        }

        function add() {
            vm.modal.show();
        }
        
        function closeModal() {
            vm.modal.hide();
        }
           
        function datePickerCallback (val) {
          if (typeof(val) === 'undefined') {
            console.log('No date selected');
          } else {
            vm.datepickerObject.inputDate = val;
          }
        }
        
        //Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function () {
            vm.modal.remove();
        });

    }

})();