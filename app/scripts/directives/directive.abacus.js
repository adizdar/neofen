/**
 * Abacus directive
 */
(function() {

    'use strict';

    angular
        .module('neofen.directives')
        .directive('abacus', abacus);

    function abacus() {
        var directive = {
        	scope: {
        		text: '=?',
                color: '=?',
                bordercolor: '=?',
                imgurl: '=?',
                contentclass: '=?'
        	}, // isolate scope
            link: link,
            templateUrl: 'templates/abacus.single.html',
            restrict: 'EA',
            controller: abacusController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }

    abacusController.$inject = ['$scope', '$log', '$rootScope'];

    function abacusController($scope, $log, $rootScope) {
        var vm = this;
        var abacusAmountAdded = 0;
        var tempResult = 0;
        var id = $scope.$id;

        vm.abacusActive = 0;
        vm.source = [];
        vm.toggleAbacus = angular.noop;
        vm.triggerAbacus = angular.noop;
        vm.abacusUpdated = abacusUpdated;

        function abacusUpdated(isAddition) {

            // abacusAmountAdded is the amount that the user adds on the abacus
            // exp. it was 3, the user adds 2, abacusAmountAdded is 2 ( NOT 5, that would be the activeAmount )
            // it was 6, the user removes 3, abacusAmountAdded is (-3)
            abacusAmountAdded = (isAddition) ? 
                                    Math.abs(vm.abacusActive - tempResult) : 
                                    (!vm.abacusActive) ? 
                                    (-1)*tempResult : // if everything is removed
                                    (-1)*Math.abs(vm.abacusActive - tempResult); // removing process
            
            tempResult = vm.abacusActive;

            // abacus ID, so the reciver knows witch isolate scope send the data
            $rootScope.$broadcast('abacus:updated', { result: abacusAmountAdded, abacusId: id, activeAmount: vm.abacusActive }); 
        }
    }

    function link(scope, element, attrs, vm) {

        vm.source = element[0].getElementsByClassName('abacus');
        vm.toggleAbacus = toggleAbacus;
        vm.triggerAbacus = triggerAbacus;
        vm.color = attrs.abacuscolor;

        function toggleAbacus(element, className, shouldToggle) {

            if (!element || !className || shouldToggle === false) return null;

            if (!angular.isDefined(element.hasClass))
                element = angular.element(element);

            if (element.hasClass(className)) {
                element.removeClass(className);
                vm.abacusActive--;
            } else {
                element.addClass(className);
                vm.abacusActive++;
            }

        }

        function triggerAbacus(event) {
            var target = angular.element(event.target),
                el = null;

            if (!vm || !vm.source) {
                console.error('VM or Source is undefined in function');
                return;
            }

            if (angular.isDefined(target) && target.hasClass('abacus')) {
                for (var i = vm.source.length - 1; i >= 0; i--) {
                    el = angular.element(vm.source[i]);

                    if (!angular.isDefined(el) || el[0] === target[0]) break;

                    if (vm.abacusActive && !target.hasClass('abacus-active')) // move the !active ones
                        vm.toggleAbacus(el, 'abacus-active', !el.hasClass('abacus-active'));
                    else if (vm.abacusActive && target.hasClass('abacus-active'))
                        vm.toggleAbacus(el, 'abacus-active', el.hasClass('abacus-active')); // because we are moving from back to forward, check if element that is taped has class active if yes move just the active ones
                    else vm.toggleAbacus(el, 'abacus-active');
                }

                // move, selected one
                vm.toggleAbacus(target, 'abacus-active'); 

                // trigger broadcast, @param: operation that needs to be exucuted (addition or subtraction)
                vm.abacusUpdated(target.hasClass('abacus-active')); 
            }
        }

    }



})();