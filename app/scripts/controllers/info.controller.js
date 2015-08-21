(function() {

    'use strict';

    angular
        .module('neofen.controllers')
        .controller('InfoController', InfoController);

    InfoController.$inject = ['$scope', '$log', 'navigationUtil', 'productDetails'];

    function InfoController($scope, $log, navigationUtil, productDetails) {

        var vm = this;

        vm.navigate = navigationUtil.navigate;
        vm.key = navigationUtil.getNavigationParam();
        vm.data = productDetails.getInfoDetails(vm.key);
        
        

    }

})();