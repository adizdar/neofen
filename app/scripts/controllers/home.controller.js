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
                                'pictureService'  ];

    function HomeController($scope, $log, $rootScope, navigationUtil, productDetails, $ionicModal, $ionicHistory, $cordovaCamera, $timeout, pictureService) {

        var vm = this;

        vm.navigate = navigationUtil.navigate;
        vm.profilePicture = null;
        vm.getPicture = getPicture;

        $rootScope.hideTabs = null;

       function getPicture() {
           pictureService.getPicture().then(function(imgData){
               alert(imgData);
                vm.profilePicture = imgData;
           }, function(err) {
               $log.error(err);
           });
        }

 
        // $ionicModal.fromTemplateUrl('templates/home.html', {
        //   scope: $scope,
        //   animation: 'slide-in-up'
        // }).then(function(modal) {
        //   vm.modal = modal;
        //   modal.show();
        //   });

        // using $rootScope to hide tab on some screens
        $rootScope.$on('$stateChangeStart', function (event, toState) {
            $rootScope.hideTabs = toState.data && toState.data.hideTabsBar;
        });
        
        // clear hostory on home
        $scope.$on("$ionicView.enter", function () {
            // $ionicHistory.clearCache(); // CHECK PERFORMANCE
            $ionicHistory.clearHistory();
        });
    }

})();