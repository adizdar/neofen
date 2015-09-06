(function() {

    'use strict';

    angular
        .module('neofen.controllers')
        .controller('CalculatorController', CalculatorController);

    CalculatorController.$inject = ['$scope', '$log', 'calculatorRules', '$ionicPopup', '$ionicScrollDelegate', 'pictureService', 'localStorageService', '$timeout'];

    function CalculatorController($scope, $log, calculatorRules, $ionicPopup, $ionicScrollDelegate, pictureService, localStorageService, $timeout) {

        var vm = this;

        vm.resultData = null;
        vm.selectedImage = null;
        vm.selectedRule = 'neofen60cepici';
        vm.max = 12;
        vm.min = 6;
        vm.calculatorRange = vm.min;
        // @todo: move this to be part of model
        vm.imageResult = {
            'neofen100sirup': {
                main: 'images/neofens.png',
                sub: 'images/kasikared.png',
                classExt: 'sirup'
            },
            'neofen60cepici': {
                main: 'images/cepici.png',
                sub: 'images/cepicred.png',
                classExt: 'cepic',
                min: 6,
                max: 12
            },
            'neofen125cepici': {
                main: 'images/cepici125.png',
                sub: 'images/cepicred.png',
                classExt: 'cepic',
                min: 12,
                max: 21
            },
            'lupocet120cepici': {
                main: 'images/lupocetc.png',
                sub: 'images/cepicblue.png',
                classExt: 'cepic',
                min: 5,
                max: 21
            },
            'lupocet120sirup': {
                main: 'images/lupocet.png',
                sub: 'images/kasikablue.png',
                classExt: 'sirup',
                min: 5,
                max: 43
            }
        };

        vm.selectRule = selectRule;
        vm.triggerRule = triggerRule;
        vm.enableScroll = enableScroll;
        vm.disableScroll = disableScroll;

        // $scope.$on('abacus:updated', updateListener.bind(this));

        // function updateListener(event, data) {

        //     if (vm.calculationResult === undefined) {
        //         vm.calculationResult = 0;
        //     }

        //     vm.calculationResult = vm.calculationResult + data.result;
        // }

        function selectRule(rule) {
            vm.selectedRule = rule;
            
            vm.max = vm.imageResult[rule].max;
            vm.min = vm.imageResult[rule].min;
            
            $timeout(function(){vm.calculatorRange = vm.min;}, 0);
            
            vm.resultData = vm.selectedImage = null;
        }

        function triggerRule() {
            var result;

            if( !vm.selectedRule ) {
            	$ionicPopup.alert({
	                title: 'Unos nije validan',
	                template: 'Molimo vas označite lijek iz menija.'
	            });
	            return;
            }

            if( !(result = calculatorRules.triggerRule(vm.selectedRule, vm.calculatorRange)) ) {
                $ionicPopup.alert({
	                title: 'Unos nije validan',
	                template: 'Molimo vas označite lijek iz menija i označite kilažu unutar kalkulatora.'
	            });
	            return;
            }

            if( result.error ) {
	            $ionicPopup.alert({
	                title: result.error ? 'Unos nije validan' : 'Kontaktirajte ljekara',
	                template: result.error || result.warning
	            });
                return;
            }

            vm.selectedImage = vm.imageResult[vm.selectedRule];
            vm.resultData = result;
            
            $ionicScrollDelegate.scrollBottom(true);

        }

        function enableScroll(event) {
				$ionicScrollDelegate.getScrollView().options.scrollingY = true;        
		}

        function disableScroll(event) {
        	if(event.target.className === 'abacus') 
				$ionicScrollDelegate.getScrollView().options.scrollingY = false;        
		}
    }
})();