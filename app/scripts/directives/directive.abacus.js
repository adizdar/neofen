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
        		abacusColor: "="
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

    abacusController.$inject = ['$scope', '$log'];

    function abacusController($scope, $log) {
        var vm = this;

        vm.abacusActive = 0;
        vm.source = [];
        vm.toggleAbacus = angular.noop;
        vm.triggerAbacus = angular.noop;

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
                $log.error('VM or Source is undefined in function');
                return;
            }

            if (angular.isDefined(target) && target.hasClass('abacus')) {
                for (var i = vm.source.length - 1; i >= 0; i--) {
                    el = angular.element(vm.source[i]);

                    if (!angular.isDefined(el) || el[0] === target[0]) break;

                    if (vm.abacusActive && !target.hasClass('abacus-active'))
                        vm.toggleAbacus(el, 'abacus-active', !el.hasClass('abacus-active'));
                    else if (vm.abacusActive && target.hasClass('abacus-active'))
                        vm.toggleAbacus(el, 'abacus-active', el.hasClass('abacus-active'));
                    else vm.toggleAbacus(el, 'abacus-active');
                }

                vm.toggleAbacus(target, 'abacus-active');
            }
        }

    }



})();