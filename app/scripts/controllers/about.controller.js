(function() {

    'use strict';

    angular
        .module('neofen.controllers')
        .controller('AboutController', AboutController);

    AboutController.$inject = ['$scope', '$log', 'navigationUtil'];

    function AboutController($scope, $log, navigationUtil) {

        var vm = this;

        vm.navigate = navigationUtil.navigate;
        vm.key = navigationUtil.getNavigationParam();
        vm.test = ['test1', 'test2', 'test3'];

    }

})();