(function() {

    'use strict';

    angular
        .module('neofen.controllers')
        .controller('ProductsController', ProductsController);

    ProductsController.$inject = ['$scope', '$log', 'navigationUtil'];

    function ProductsController($scope, $log, navigationUtil) {

        var vm = this;

        vm.navigate = navigationUtil.navigate;

    }

})();