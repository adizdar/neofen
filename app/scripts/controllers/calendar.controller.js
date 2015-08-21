(function () {

    'use strict';

    angular
        .module('neofen.controllers')
        .controller('CalendarController', CalendarController);

    CalendarController.$inject = ['$scope', '$log', '$ionicPopup', '$cordovaCalendar'];

    function CalendarController($scope, $log, $ionicPopup, $cordovaCalendar) {

        var vm = this;
        var helpDateText = "U sekcijama OD i DO unosite broj dana trajanja podsjetnika u kalendaru ( Npr. od 25.6 do 29.6 će vam stizati notifikacije o podsjetniku). Interval također može biti isti dan.";
        var helpTimeText = "U sekcijama OD i DO unosite vremenski interval trajanja podsjetnika u kalendaru. U tom intervalu će interni kalendar mobilnog uređaja postaviti podsjetnik aktivnim. (Npr. Od 18:00h do 20:00h )";
        var helpPillsText = "U početak unosite vrijeme prve tablete, u razmak sekciji unosite koliko svakih sati morate piti tabletu."
        
        vm.dateFrom = null;
        vm.dateTo = null;
        vm.timeTo = null;
        vm.timeFrom = null;
        vm.calendarEventTitle = null;
        
        vm.submitDate = submitDate;
        vm.help = help;
       
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
            
            if(!vm.dateFrom || !vm.timeFrom || !vm.dateTo || !vm.timeTo) {
                $ionicPopup.alert({
	                title: 'Datum i vrijeme',
	                template: 'Molimo vas unesite datum i vrijeme.'
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
        
        function help(param) {
            $ionicPopup.alert({
	                title: param === 'date' ? 'Datum' : 'Vrijeme',
	                template: param === 'date' ? helpDateText : helpTimeText
	        });
        }
        
    }

})();