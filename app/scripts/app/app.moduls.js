
/**
 * Module definition
 */

// app.js

(function () {

  'use strict';

	angular.module('neofen', 
		['ionic', 
		'angular-datepicker',
		'neofen.controllers', 
		'neofen.services',
		'neofen.directives',
		'ngCordova',
		'ngAnimate',
		'templates'
	]);

	angular.module('neofen.controllers', []);
	angular.module('neofen.services', []);
	angular.module('neofen.directives', []);

})();

