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
                                '$timeout',
                                'pictureService',
                                'localStorageService'];

    function HomeController($scope, 
                            $log, 
                            $rootScope, 
                            navigationUtil,
                            productDetails, 
                            $ionicModal, 
                            $ionicHistory, 
                            $timeout, 
                            pictureService, 
                            localStorageService) {

        var vm = this;

        vm.navigate = navigationUtil.navigate;
        vm.choosePicture = choosePicture;
                
        vm.profile = { 
            image: 'images/camera.png', 
            name: null, 
            defaultValues: true
        };
        $rootScope.hideTabs = null;
        
        init();
        
        function init() {
            getPicture();   
        }
       
       function getPicture() {
         var profileData = localStorageService.getDataByKey('profile');
         
         if(profileData) {
             // resolving string url to native url, so after we save the picture it will show after we load it back
             window.resolveLocalFileSystemURI(profileData.picture, function(fileEntry) {
                vm.profile.image = fileEntry.nativeURL;
                vm.profile.defaultValues = false; 
             });
         }
        }
                   
        function choosePicture() {
           pictureService.getPicture().then(function(imgData){
               if(imgData) { 
                    localStorageService.syncCdmByKeyValue('profile', { picture: imgData,  name: 'Test Testa'});
                    vm.profile.image = imgData;
                    vm.profile.defaultValues = false;
               }
           }, function(err) {
               $log.error(err);
               vm.profile.defaultValues = true;
           });
        }

        // using $rootScope to hide tab on some screens
        $rootScope.$on('$stateChangeStart', function (event, toState) {
            $rootScope.hideTabs = toState.data && toState.data.hideTabsBar;
        });
        
        // clear hostory on home
        $scope.$on("$ionicView.enter", function () {
            // $ionicHistory.clearCache(); // @todo: CHECK PERFORMANCE
            $ionicHistory.clearHistory();
            getPicture(); // so the image will be refreshed TODO refactor with broadcase
        });
    }

})();