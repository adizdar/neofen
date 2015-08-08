(function(){

	'use strict';

	angular
        .module('neofen.controllers')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$log', '$rootScope', 'navigationUtil', 'productDetails', '$ionicModal', '$ionicHistory'];  
    
    function HomeController($scope, $log, $rootScope, navigationUtil, productDetails, $ionicModal, $ionicHistory) {

    	var vm = this;

    	vm.navigate = navigationUtil.navigate;
        vm.modal = null;
    	$rootScope.hideTabs = null;  
        
        // $ionicModal.fromTemplateUrl('templates/home.html', {
        //   scope: $scope,
        //   animation: 'slide-in-up'
        // }).then(function(modal) {
        //   vm.modal = modal;
        //   modal.show();
        //   });

    	// using $rootScope to hide tab on some screens
    	$rootScope.$on('$stateChangeStart', function(event, toState) {
    		 $rootScope.hideTabs = toState.data && toState.data.hideTabsBar;
        });
        
        // clear hostory on home
        $scope.$on("$ionicView.enter", function(){
               // $ionicHistory.clearCache(); // CHECK PERFORMANCE
               $ionicHistory.clearHistory();
        });
    }

})();