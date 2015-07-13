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
                text: '@',
                subtext: '@',
                subimgurl: '@'
        	}, // isolate scope
            link: link,
            templateUrl: 'templates/startbutton.html',
            restrict: 'EA'
        };

        return directive;
    }

    function link(scope, element, attrs) {
        element.bind('click', function(){ 
            this.style.opacity = 0.7;
            
            setTimeout((function() {
                this.style.opacity = 1;
            }).bind(this), 30);
        });
    }



})();