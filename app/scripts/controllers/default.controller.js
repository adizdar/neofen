(function() {

    'use strict';

    angular
        .module('neofen.controllers')
        .controller('DefaultController', DefaultController);

    DefaultController.$inject = ['$scope', '$log', 'navigationUtil'];

    function DefaultController($scope, $log, navigationUtil) {

        var vm = this;
        
        vm.navigate = navigationUtil.navigate;
        vm.key = navigationUtil.getNavigationParam();

    }

})();