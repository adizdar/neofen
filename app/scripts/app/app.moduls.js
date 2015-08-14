
/**
 * Module definition
 */

// app.js

(function () {

  'use strict';

	angular.module('neofen', 
		['ionic', 
        'LocalForageModule',
		'angular-datepicker',
		'neofen.controllers', 
		'neofen.services',
		'neofen.directives',
		'ngCordova',
		'ngAnimate'
	]);

	angular.module('neofen.controllers', []);
	angular.module('neofen.services', []);
	angular.module('neofen.directives', []);

})();

