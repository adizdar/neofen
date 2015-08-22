(function() {

    'use strict';

    angular
        .module('neofen.controllers')
        .controller('InfoController', InfoController);

    InfoController.$inject = ['$scope', '$log', 'navigationUtil', 'productDetails'];

    function InfoController($scope, $log, navigationUtil, productDetails) {

        var vm = this;
        var defaultTextSize = 100;
        
        vm.navigate = navigationUtil.navigate;
        vm.key = navigationUtil.getNavigationParam();
        vm.data = productDetails.getInfoDetails(vm.key);
        
        vm.manipulateFontSize = manipulateFontSize;
        vm.textSize = 0;
        
        function manipulateFontSize(value, sign, incressOperation) {
            var fontSize;
            
            if( !(value = parseInt(value)) ) {
                $log.error('value is not a number ', value);
                return;
            }
            
            fontSize =  incressOperation ? 
                        (defaultTextSize += value).toString():  
                        (defaultTextSize -= value).toString();
            
            vm.textSize = {'font-size': fontSize + sign};
            
        }

    }

})();