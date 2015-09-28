(function () {

    'use strict';

    angular
        .module('neofen.controllers')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope',
        '$log',
        '$rootScope',
        'navigationUtil',
        'productDetails',
        '$ionicModal',
        '$ionicHistory',
        '$timeout',
        'pictureService',
        'localStorageService',
        '$cordovaSplashscreen',
        '$ionicPopup'];

    function HomeController($scope,
        $log,
        $rootScope,
        navigationUtil,
        productDetails,
        $ionicModal,
        $ionicHistory,
        $timeout,
        pictureService,
        localStorageService,
        $cordovaSplashscreen,
        $ionicPopup) {

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
            getData();
        }

        function getData() {
            var profileData = localStorageService.getDataByKey('profile');
            $log.log(localStorageService.getCdm());
            if (profileData && Object.keys(profileData).length > 0) {
                vm.profile = profileData;

                if (profileData.image && window.resolveLocalFileSystemURL) {
                    // resolving string url to native url, so after we save the picture it will show after we load it back
                    window.resolveLocalFileSystemURL(profileData.image, function (fileEntry) {
                        vm.profile.image = fileEntry.nativeURL;
                        vm.profile.defaultValues = false;
                    }, function(err) {
                      console.log(err);
                    });
                }
            }
        }
        function choosePicture() {
            pictureService.getPicture().then(function (imgData) {
                if (imgData) {
                    vm.profile.image = imgData;
                    vm.profile.defaultValues = false;
                    localStorageService.syncCdmByKeyValue('profile', vm.profile);
                    $ionicPopup.alert({
                      title: 'Slika',
                      template: 'Ukoliko postavja slika ne odgovara molimo pokušajte odabrati neku drugu iz vase galerije!'
                    });
                }
            }, function (err) {
                $ionicPopup.alert({
                  title: 'Slika',
                  template: 'Doslo je do greske molimo vas pokusajte ponovo!'
                });
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
            getData(); // so the image and data will be refreshed TODO refactor with broadcase
        });

        $scope.$on('$ionicView.loaded', function() {
          $timeout(function(){
            console.log('SPLASH');
            ionic.Platform.ready( function() {
              $cordovaSplashscreen.hide();
            });
          }, 1000);
      });
    }

})();
