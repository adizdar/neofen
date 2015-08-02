(function () {

    'use strict';

    angular
        .module('neofen.controllers')
        .controller('CalendarController', CalendarController);

    CalendarController.$inject = ['$scope', '$log', '$ionicPopup', '$cordovaCalendar'];

    function CalendarController($scope, $log, $ionicPopup, $cordovaCalendar) {

        var vm = this;
        
        vm.dateFrom = null;
        vm.dateTo = null;
        vm.timeTo = null;
        vm.timeFrom = null;
        vm.calendarEventTitle = null;
        
        vm.submitDate = submitDate;
        // @todo create a one time reminder for repeat days
        function submitDate() {
            var startDate, endDate;
            
            if(!vm.calendarEventTitle) {
                $ionicPopup.alert({
	                title: 'Kategorija',
	                template: 'Molimo vas označite kategoriju iz menija.'
	            });
                return;
             }
            
            if(!vm.dateFrom || !vm.timeFrom) {
                $ionicPopup.alert({
	                title: 'Datum i vrijeme',
	                template: 'Molimo vas unesite datum i vrijeme u sekciji "OD".'
	            });
                return;
             }
             
             if(!vm.dateTo || !vm.timeTo) {
                $ionicPopup.alert({
	                title: 'Datum i vrijeme',
	                template: 'Molimo vas unesite datum i vrijeme u sekciji "DO".'
	            });
                return;
             }
            
            startDate = new Date(vm.dateFrom.getFullYear(),
                                     vm.dateFrom.getMonth(),
                                     vm.dateFrom.getDate(),
                                     vm.timeFrom.getHours(),
                                     vm.timeFrom.getMinutes(), 0, 0, 0);
            
            endDate = new Date(vm.dateTo.getFullYear(),
                                     vm.dateTo.getMonth(),
                                     vm.dateTo.getDate(),
                                     vm.timeTo.getHours(),
                                     vm.timeTo.getMinutes(), 0, 0, 0);
            
            $cordovaCalendar.createEvent({
                title: vm.calendarEventTitle,
                location: '',
                notes: 'Podsjetnik kreiran iz Neofen aplikacije!',
                startDate: startDate,
                endDate: endDate
              }).then(function (result) {
                $ionicPopup.alert({
	                title: 'Podsjetnik',
	                template: 'Podsjetnik uspješno kreiran i unesen u kalendar mobilnog uređaja,' + 
                    ' više informacija o kreiranom podsjetniku kao i izmjene podsjetnika, možete izvršiti u kalendaru mobilnog uređaja!'
	            });
              }, function (err) {
                 $ionicPopup.alert({
	                title: 'Podsjetnik',
	                template: 'Došlo je do greške molimo vas pokusajte ponovo!'
	            });
            });
        }
        
    }

})();