(function () {

    'use strict';

    angular
        .module('neofen.controllers')
        .controller('HomeController', HomeController);

    HomeController.$inject = [  '$scope', 
                                '$log', 
                                '$rootScope', 
                                'navigationUtil', 
                                'productDetails', 
                                '$ionicModal', 
                                '$ionicHistory', 
                                '$cordovaCamera',
                                '$timeout',
                                'pictureService',
                                'localStorageService' ];

    function HomeController($scope, 
                            $log, 
                            $rootScope, 
                            navigationUtil,
                            productDetails, 
                            $ionicModal, 
                            $ionicHistory, 
                            $cordovaCamera,
                            $timeout, 
                            pictureService, 
                            localStorageService ) {

        var vm = this;

        vm.navigate = navigationUtil.navigate;
        vm.profile = {image: null, name: null};
        vm.test = test;
        $rootScope.hideTabs = null;
        
        init();
        
        function init() {
            getPicture();            
        }
       
       function getPicture() {
         var profileData = localStorageService.getDataByKey('profile')
         if(profileData) vm.profile.image = profileData.picture;
        }
        
               
        function test() {
           pictureService.getPicture().then(function(imgData){
               if(imgData) localStorageService.syncByKeyValue('profile', { picture: imgData,  name: 'Test Testa'});
               vm.profile.image = imgData;
           }, function(err) {
               $log.error(err);
           });
        }

        // using $rootScope to hide tab on some screens
        $rootScope.$on('$stateChangeStart', function (event, toState) {
            $rootScope.hideTabs = toState.data && toState.data.hideTabsBar;
        });
        
        // clear hostory on home
        $scope.$on("$ionicView.enter", function () {
            // $ionicHistory.clearCache(); // CHECK PERFORMANCE
            $ionicHistory.clearHistory();
            getPicture(); // so the image will be refreshed TODO refactor with broadcase
        });
    }

})();