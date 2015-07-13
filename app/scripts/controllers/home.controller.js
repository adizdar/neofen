(function(){

	'use strict';

	angular
        .module('neofen.controllers')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$log', '$rootScope', 'navigationUtil'];  
    
    function HomeController($scope, $log, $rootScope, navigationUtil) {

    	var vm = this;

    	vm.navigate = navigationUtil.navigate;
    	$rootScope.hideTabs = null;

    	// using $rootScope to hide tab on some screens
    	$rootScope.$on('$stateChangeStart', function(event, toState) {
    		 $rootScope.hideTabs = toState.data && toState.data.hideTabsBar;
        });

    }

})();