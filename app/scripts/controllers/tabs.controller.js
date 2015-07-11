
(function(){

	'use strict';

	angular
        .module('neofen.controllers')
        .controller('TabsController', TabsController);

    TabsController.$inject = ['$scope', '$log', '$rootScope'];  
    
    function TabsController($scope, $log, $rootScope) {

    	var vm = this;
    	//$rootScope.hideTabs = null;

    	// // using $rootScope to hide tab on some screens
    	// $rootScope.$on('$stateChangeStart', function(event, toState) {
    	// 	 $rootScope.hideTabs = toState.data && toState.data.hideTabsBar;
     //    });
    }

})();