
/**
 * Module definition
 */

// app.js

(function () {

  'use strict';

	angular.module('neofen',
		['ngIOS9UIWebViewPatch',
    'ionic',
    'LocalForageModule',
		'angular-datepicker',
		'neofen.controllers',
		'neofen.services',
		'neofen.directives',
		'ngCordova',
		'ngAnimate',
		'ionic-datepicker',
		'templates'
	]);

	angular.module('neofen.controllers', []);
	angular.module('neofen.services', []);
	angular.module('neofen.directives', []);

})();
