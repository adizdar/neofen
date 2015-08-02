/* global Media */
/* global angular */
(function() {

    'use strict';

    angular
        .module('neofen.controllers')
        .controller('MusicController', MusicController);

    MusicController.$inject = ['$scope', '$log', '$ionicPlatform', '$rootScope'];

    function MusicController($scope, $log, $ionicPlatform, $rootScope) {

        var vm = this;
        var currentSong = null;
        var currentId = null;

        vm.triggerPlay = triggerPlay;
        vm.stop = stop;

        vm.playing = false;
  
        function triggerPlay(src, event) {
            var media;
            
            // quirk for androdi
            if($ionicPlatform.is('android')) {
                src = '/android_asset/www' + src;
            }

            // // if reload is tapped
            // if(event.target.className === 'ion-refresh' && currentSong) {
            //     currentSong.stop();
            //     currentSong.play();
            //     return;
            // }

            // if song is playing & it is the same song, resume or stop 
            if (currentSong && currentId === src) {
                
                // stop/resume song  
                if (vm.playing) {
                    currentSong.stop();
                } else {
                    currentSong.play();
                }
                
                // toggle play status
                vm.playing = !vm.playing; 
                
            } else §{
                
                // stop current song
                currentSong && currentSong.stop();
                
                // on dev enviroment Media object is created in services.js
                media = currentSong = new Media(src, null, null);
                currentId = src;
                media.play();
 
                vm.playing = true;
            }
        }
        
        function stop(params) {
            if(currentSong) currentSong.stop();
            else $log.error('Song is not difined in music.controller');
        }
        
        // stop music on page leave
        $rootScope.$on('$stateChangeStart', function(event, toState) {
    		 currentSong.stop();
        });
        

    }
})();