(function () {

    'use strict';

    angular
        .module('neofen.controllers')
        .controller('MyFirstViewController', MyFirstViewController);

    MyFirstViewController.$inject = ['$scope', '$log', 'navigationUtil', 'localStorageService'];

    function MyFirstViewController($scope, $log, navigationUtil, localStorageService) {

        var vm = this;

        // variables
        vm.data = [];
        vm.showDelete = false;
        vm.isAddMode = navigationUtil.getNavigationParam();
        vm.navigate = navigationUtil.navigate;
		
        // functions
        vm.editItem = editItem;
        vm.deleteItem = deleteItem;
		
        init();
        
        // @todo param sholud be sent from previous view, so we can make this controller reausuble
        function init() {
            var data = localStorageService.getDataByKey('myfirst');
            
            // Case add item
            if(vm.isAddMode) {
                vm.data = [{title: 'Moj prvi izlazak...'}, {title: 'Moja prva riječ...'}, {title: 'Moj prvi rođendan...'}, {title: 'Moj prvi izlazak...'}, {title: 'Moj prvi osmijeh...'}];
            } else {
                vm.data = (data && data instanceof Array) ? data : vm.data;
            }
        }
        
		function editItem(item){
			navigationUtil.navigate('myfirstadd', item);
		}
        
        function deleteItem(item) {
            var index = vm.data.indexOf(item);
            
            if(index === -1) {
                $log.error('item not found in myfirst.view.controller -> deleteItem index:' + index);
                return
            }
            
            vm.data.splice(index,1);
            localStorageService.syncCdmByKeyValue('myfirst', vm.data);
        }

    }

})();