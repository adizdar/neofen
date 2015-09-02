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
		
        // functions
        vm.editItem = editItem;
        vm.deleteItem = deleteItem;
		
        init();
        
        function init() {
            var data = localStorageService.getDataByKey('myfirst');
            vm.data = (data && data instanceof Array) ? data : [];
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