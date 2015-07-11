
/**
 * Module definition
 */

// app.js

(function () {

  'use strict';

	angular.module('neofen', 
		['ionic', 
		'neofen.controllers', 
		'neofen.services',
		'neofen.directives',
		'ngCordova'
	]);

	angular.module('neofen.controllers', []);
	angular.module('neofen.services', []);
	angular.module('neofen.directives', []);

})();

