(function() {

    'use strict';

    angular
        .module('neofen.controllers')
        .controller('CalculatorController', CalculatorController);

    CalculatorController.$inject = ['$scope', '$log', 'calculatorRules', '$ionicPopup'];

    function CalculatorController($scope, $log, calculatorRules, $ionicPopup) {

        var vm = this;

        vm.calculationResult = 0;
        vm.resultData = null;
        vm.selectedImage = null;
        vm.selectedRule = null;
        vm.imageResult = {
            'neofen100sirup': {
                main: 'images/neofens.png',
                sub: 'images/kasikared.png',
                classExt: 'sirup'
            },
            'neofen60cepici': {
                main: 'images/cepici.png',
                sub: 'images/cepicred.png',
                classExt: 'cepic'
            },
            'neofen125cepici': {
                main: 'images/cepici125.png',
                sub: 'images/cepicred.png',
                classExt: 'cepic'
            },
            'lupocet120cepici': {
                main: 'images/lupocetc.png',
                sub: 'images/cepicblue.png',
                classExt: 'cepic'
            },
            'lupocet120sirup': {
                main: 'images/lupocet.png',
                sub: 'images/kasikablue.png',
                classExt: 'sirup'
            }
        };

        vm.selectRule = selectRule;
        vm.triggerRule = triggerRule;

        $scope.$on('abacus:updated', updateListener.bind(this));

        function updateListener(event, data) {

            if (vm.calculationResult === undefined) {
                vm.calculationResult = 0;
            }

            vm.calculationResult = vm.calculationResult + data.result;

            $log.log(vm.calculationResult);
        }

        function selectRule(rule) {
            vm.selectedRule = rule;
            vm.resultData = vm.selectedImage = null;
        }

        function triggerRule() {
            var result = calculatorRules.triggerRule(vm.selectedRule, vm.calculationResult);;

            if(!result) {
                $ionicPopup.alert({
	                title: 'Unos nije validan',
	                template: 'Molimo vas označite lijek iz menija i označite kilažu unutar kalkulatora.'
	            });
	            return;
            }

            if(result.error || result.warning) {
	            $ionicPopup.alert({
	                title: result.error ? 'Unos nije validan' : 'Kontaktirajte ljekara',
	                template: result.error || result.warning
	            });
	            return;
        	}

            vm.selectedImage = vm.imageResult[vm.selectedRule];

            vm.resultData = result;
            $log.log(result);
        }
    }

})();