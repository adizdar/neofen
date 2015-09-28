(function() {

    'use strict';

    angular
        .module('neofen.controllers')
        .controller('CalendarArchivController', CalendarArchivController);

    CalendarArchivController.$inject = ['$scope', '$log', 'localStorageService', '$cordovaCalendar'];

    function CalendarArchivController($scope, $log, localStorageService, $cordovaCalendar) {

        var vm = this;

        vm.data = [];

        vm.getFormatedDate = getFormatedDate;
        vm.getFormatedTime = getFormatedTime;
        vm.getRepeater = getRepeater;

        init();

        function init() {
          var tempData = localStorageService.getDataByKey('calendarArchiv');
          vm.data = tempData ? tempData.reverse() : tempData;
        }

        function getFormatedDate(date, dateTo, isMedicineCategory) {
          if(!date) return null;

          date = new Date(date);
          dateTo = isMedicineCategory ? new Date(dateTo) : '';

          return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear() +
                 (dateTo ? ' - ' + dateTo.getDate() + '/' + dateTo.getMonth() + '/' + dateTo.getFullYear() : '');
        }

        function getFormatedTime(time) {
          if(!time) return null;
          time = new Date(time);
          return time.getHours() + ':' +  (time.getMinutes()<10?'0':'') + time.getMinutes();
        }

        function getRepeater(repeat) {
          if(!repeat) return '';
          return 'Ponavljanja: ' + 'x' + repeat;
        }
    }

})();
