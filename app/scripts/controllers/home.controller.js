(function(){

	'use strict';

	angular
        .module('neofen.controllers')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$log', '$ionicHistory', '$state', '$rootScope'];  
    
    function HomeController($scope, $log, $ionicHistory, $state, $rootScope) {

    	var vm = this;

    	vm.navigate = navigate;
    	$rootScope.hideTabs = null;

    	function navigate(key) {
	    	
	    	$ionicHistory.nextViewOptions ({
	    		disableAnimate: true
			});

	    	switch (key) {
	    		case 'calculator':
	    		$state.go('calculator');
	    		break;
	    	}

    	}

    	// using $rootScope to hide tab on some screens
    	$rootScope.$on('$stateChangeStart', function(event, toState) {
    		 $rootScope.hideTabs = toState.data && toState.data.hideTabsBar;
        });

    }

})();