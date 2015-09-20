(function() {

  'use strict';

  angular
    .module('neofen.controllers')
    .controller('CalendarController', CalendarController);

  CalendarController.$inject = ['$scope', '$log', '$ionicPopup', '$cordovaCalendar', '$window', '$timeout', 'navigationUtil', 'localStorageService'];

  function CalendarController($scope, $log, $ionicPopup, $cordovaCalendar, $window, $timeout, navigationUtil, localStorageService) {

    var vm = this;

    vm.repeat = vm.repeatInterval = null;
    vm.showHeader = false;
    vm.calendarData = {
      date: null,
      dateTo: null,
      time: null,
      repeat: '',
      calendarEventTitle: null,
      alarm: 30,
      title: null,
      isMedicineCategory: false
    };
    vm.options = {
      disable: [{
        from: [1990, 1, 1],
        to: new Date(new Date - 86700000)
      }]
    };

    vm.formatDateForCalendarApi = formatDateForCalendarApi;
    vm.navigate = navigationUtil.navigate;
    vm.chooseCategory = chooseCategory;
    vm.submitDate = submitDate;
    vm.setDate = setDate;

    // Calendar methods
    function submitDate() {
      var date, dateTo, hours,
          daysBetweenDate, calendarOptions;

      if (!vm.calendarData.calendarEventTitle) {
        $ionicPopup.alert({
          title: 'Kategorija',
          template: 'Molimo vas označite kategoriju iz menija.'
        });
        return;
      }

      if (!validate(vm.calendarData)) {
        $ionicPopup.alert({
          title: 'Kalendar',
          template: 'Popunite sva polja označene sa zvjecdicom.'
        });
        return;
      }

      if (window.plugins && window.plugins.calendar) {
        calendarOptions = window.plugins.calendar.getCalendarOptions();
        calendarOptions.firstReminderMinutes = +vm.calendarData.alarm;
        calendarOptions.firstReminderMinutes = 5;
      }

      if (vm.calendarData.isMedicineCategory) {
        vm.repeatInterval = +vm.calendarData.repeat - 1; // because we already save the first entry
        vm.calculateIntervalForRepeat = calculateIntervalForRepeat(); // every time we want a new temp value

        calendarOptions.recurrence = 'daily';
        calendarOptions.recurrenceEndDate = vm.formatDateForCalendarApi(vm.calendarData.dateTo);
        calendarOptions.recurrenceInterval = 1;
      }

      date = new Date(vm.calendarData.date.getFullYear(),
        vm.calendarData.date.getMonth(),
        vm.calendarData.date.getDate(),
        vm.calendarData.time.getHours(),
        vm.calendarData.time.getMinutes(), 0, 0, 0);

      setDate(date, calendarOptions);
    }

    function callbackError(err) {
      $log.log(err);
      $ionicPopup.alert({
        title: 'Podsjetnik',
        template: 'Došlo je do greške molimo vas pokusajte ponovo!'
      });
    }

    function chooseCategory(title) {
      vm.calendarData.calendarEventTitle = title;
      vm.showHeader = true;
      vm.calendarData.isMedicineCategory = (title === 'Lijekovi');
    }

    function callbackSuccess(result) {
      if (this.calendarData.isMedicineCategory && this.repeatInterval) {
        this.setDate(this.formatDateForCalendarApi(this.calendarData.date, this.calendarData.time, this.calculateIntervalForRepeat()), {
          recurrence: 'daily',
          recurrenceInterval: 1,
          recurrenceEndDate: this.formatDateForCalendarApi(this.calendarData.dateTo)
        });
        this.repeatInterval--;
      } else {
        $ionicPopup.alert({
          title: 'Podsjetnik',
          template: 'Podsjetnik je generisan i spašen u kalendar, sve izmjene nad njim možete učiniti iz kalendara mobilnog uređaja.'
        });

        localStorageService.addData('calendarArchiv', angular.copy(vm.calendarData), []);
      }
    }

    function setDate(date, calendarOptions) {
      var options = {
        title: vm.calendarData.calendarEventTitle + ' ' + vm.calendarData.title,
        location: '',
        notes: 'Podsjetnik kreiran iz Neofen aplikacije!',
        startDate: date, // end date needs to be in this format so we don't get a all day event
        endDate: new Date(date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          date.getHours() + 1,
          date.getMinutes(), 0, 0, 0),
        firstReminderMinutes: +vm.calendarData.alarm,
        secondReminderMinutes: 5//+vm.calendarData.alarm,
      };

      if (calendarOptions instanceof Object) {
        for (var key in calendarOptions) {
          if (calendarOptions.hasOwnProperty(key))
            options[key] = calendarOptions[key];
        }
      }

      $cordovaCalendar.createEventWithOptions(options)
                      .then(callbackSuccess.bind(vm), callbackError);
    }

    // Helper methods
    function formatDateForCalendarApi(date, time, hourDelay) {
      if (!hourDelay) hourDelay = 0;
      return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(), (time ? time.getHours() + hourDelay : date.getHours() + hourDelay), (time ? time.getMinutes() : date.getMinutes()), 0, 0, 0);
    }

    function calculateIntervalForRepeat() {
      var temp = 0;

      return function() {
        var hours = 24 / +vm.calendarData.repeat
        return temp = temp + hours; // calcualte only for one day
      }
    }

    function daysBetween(timeOne, timeTwo) {
      return Math.round(Math.abs(timeOne - timeTwo) / 8.64e7);
    }

    function validate(object) {
      var tempObject = angular.copy(object);

      if(!vm.calendarData.isMedicineCategory) {
        delete tempObject['dateTo'];
        delete tempObject['repeat'];
        delete tempObject['isMedicineCategory'];
      }

      for(var key in tempObject) {
        if(tempObject.hasOwnProperty(key) && !tempObject[key]) {
          return false;
        }
      }
      return true;
    }
  }

})();
