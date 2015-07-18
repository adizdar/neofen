(function() {

    'use strict';

    angular
        .module('neofen.controllers')
        .controller('ProductsController', ProductsController);

    ProductsController.$inject = ['$scope', '$log', 'navigationUtil', 'productDetails'];

    function ProductsController($scope, $log, navigationUtil, productDetails) {

        var vm = this;

        vm.dosageDetails = productDetails.getDosageDetails();
        vm.navigate = navigationUtil.navigate;


    }

})();