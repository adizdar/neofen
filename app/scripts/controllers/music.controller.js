/* global Media */
/* global angular */
(function() {

    'use strict';

    angular
        .module('neofen.controllers')
        .controller('MusicController', MusicController);

    MusicController.$inject = ['$scope', '$log', '$ionicLoading'];

    function MusicController($scope, $log, $ionicLoading) {

        var vm = this;
        var currentSong = null;
        var currentId = null;
        var playing = false;

        vm.triggerPlay = triggerPlay;
        vm.stop = stop;

        function triggerPlay(src) {
            var media;
            
            // if song is playing & it is the same song, resume or stop 
            if (currentSong && currentId === src) {
                
                // stop/resume song  
                if (playing) {
                    currentSong.pause();
                } else {
                    currentSong.play();
                }
                
                // toggle play status
                playing = !playing; 
                
            } else {
                
                // stop current song
                currentSong && currentSong.stop();
                
                // on dev enviroment Media object is created in services.js
                media = currentSong = new Media(src, null, null);
                currentId = src;
                media.play();
 
                playing = true;
            }
        }
        
        function stop(params) {
            if(currentSong) currentSong.stop();
            else $log.error('Song is not difined in music.controller');
        }
    }
})();