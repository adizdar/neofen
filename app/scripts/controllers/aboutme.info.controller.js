(function () {

    'use strict';

    angular
        .module('neofen.controllers')
        .controller('AboutMeInfoController', AboutMeInfoController);

    AboutMeInfoController.$inject = ['$scope', '$log', 'navigationUtil', 'localStorageService', 'pictureService', '$ionicPopup'];

    function AboutMeInfoController($scope, $log, navigationUtil, localStorageService, pictureService, $ionicPopup) {

        var vm = this;
        
        // Variables decleraion
        vm.profile = { 
            image: 'images/camera.png', 
            name: null, 
            defaultValues: true
        };
        
        vm.datepickerNowObject = {
            titleLabel: 'Datum',
            inputDate: null,
            callback: function (val) {
                datePickerNowCallback(val);
            }
        };
        
        // Functions
        vm.choosePicture = choosePicture;
        vm.save = save;
        
        init();
        
        function init() {
            var tempData = localStorageService.getDataByKey('aboutme');
            
            if (!tempData) {
                localStorageService.createObjectByKey('aboutme');
            }
            
            if (tempData && Object.keys(tempData).length) {
                vm.profile = tempData;
                vm.datepickerNowObject.inputDate = tempData.date ? new Date(tempData.date) : null;
            }
            
            
            //getPicture();   
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
        
        function save() {
            vm.profile.date = vm.datepickerNowObject.inputDate;
            localStorageService.syncCdmByKeyValue('aboutme', vm.profile);
            
            $ionicPopup.alert({
                    title: 'O meni',
                    template: 'Podaci o djetetu su pohranjeni. '
                });
        }
                   
        function choosePicture() {
           pictureService.getPicture().then(function(imgData){
               if(imgData) { 
                    vm.profile.image = imgData;
                    vm.profile.defaultValues = false;
               }
           }, function(err) {
               $log.error(err);
               vm.profile.defaultValues = true;
           });
        }
        
        function datePickerNowCallback(val) {
            if (typeof (val) === 'undefined') {
                $log.error('No date selected');
            } else {
                vm.datepickerNowObject.inputDate = val;
            }
        }

    }

})();