(function() {

    'use strict';

    angular
        .module('neofen.controllers')
        .controller('ProductsController', ProductsController);

    ProductsController.$inject = ['$scope', '$log', 'navigationUtil', 'productDetails', '$cordovaFileOpener2'];

    function ProductsController($scope, $log, navigationUtil, productDetails, $cordovaFileOpener2) {

        var vm = this;

        vm.productKey = navigationUtil.getNavigationParam();
        vm.dosageDetails = productDetails.getDosageDetails();
        vm.data = smpc;
        vm.navigate = navigationUtil.navigate;


    }
})();