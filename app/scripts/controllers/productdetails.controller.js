(function() {

    'use strict';

    angular
        .module('neofen.controllers')
        .controller('ProductDetailsController', ProductDetailsController);
        
    ProductDetailsController.$inject = ['$scope', '$log', 'navigationUtil', 'productDetails', '$timeout'];

    function ProductDetailsController($scope, $log, navigationUtil, productDetails, $timeout) {

        var vm = this;

        vm.data = null;
        init();

        function init() {
           vm.data = productDetails.getProductByKey(navigationUtil.getNavigationParam());
        }        

    }

})();