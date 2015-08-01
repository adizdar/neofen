(function() {

    'use strict';

    angular
        .module('neofen.controllers')
        .controller('MusicController', MusicController);

    MusicController.$inject = ['$scope', '$log', '$ionicLoading'];

    function MusicController($scope, $log, $ionicLoading) {

        var vm = this;
        var currentSong = null;

        vm.play = play;
        vm.stop = stop;

        function play(src) {
            var media;

            if(currentSong) vm.stop(currentSong);

            media = currentSong = new Media(src, null, null, null);
            media.play();
        }

        function stop(media) {
            media.stop();
        }

    }

})();