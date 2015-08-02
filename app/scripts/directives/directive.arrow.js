/**
 * Star Button directive
 */
(function() {

    'use strict';

    angular
        .module('neofen.directives')
        .directive('arrowButton', arrowButton);

    function arrowButton() {
        var directive = {
        	scope: {
                imgurl: '@',
                contentclass: '@',
                text: '@',
				showsecondimage: '@?',
                secondimageclass: '@?',
                toggle: '@?',
                subimageurl: '@?'
        	}, // isolate scope
            link: link,
            templateUrl: 'templates/arrow-directive.html',
            restrict: 'EA'
        };

        return directive;
    }

    function link(scope, element, attrs) {
        element.bind('tap', onTap);
    }
    

     function onTap(event){ 
            this.style.opacity = 0.7;
            
            setTimeout((function() {
                this.style.opacity = 1;
            }).bind(this), 30);
            
        }


})();