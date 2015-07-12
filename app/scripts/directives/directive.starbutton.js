/**
 * Star Button directive
 */
(function() {

    'use strict';

    angular
        .module('neofen.directives')
        .directive('starButton', starButton);

    function starButton() {
        var directive = {
        	scope: {
        		color: '@',
                imgurl: '@',
                bordercolor: '@',
                contentclass: '@',
                text: '@'

        	}, // isolate scope
            link: link,
            templateUrl: 'templates/startbutton.html',
            restrict: 'EA'
        };

        return directive;
    }

    function link(scope, element, attrs, vm) {
    }



})();