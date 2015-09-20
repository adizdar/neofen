angular.module('neofen')
    .run(runPlatform);

runPlatform.$inject = ['$ionicPlatform', '$cordovaSplashscreen', 'localStorageService'];

function runPlatform($ionicPlatform, $cordovaSplashscreen, localStorageService) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }

        localStorageService.initializeCdmWithLocalStorage([{ about: {} }, { myfirst: []}, { aboutMe: [] }]);

        // var templates = [
        //     "../templates/calculator.html",
        //     "../templates/tab-products.html",
        //     "../templates/tab-product-details.html"
        // ];
        // //@todo seems its not working
        // // templates.forEach(function(tpl) {
        // //     $http.get('../templates/' + tpl + '.html', {
        // //         cache: $templateCache
        // //     });
        // // });
        // for (var i = 0, length = templates.length; i < length; i++) {
        //     var template = templates[i];
        //     if ($templateCache.get(template)) {
        //         return; //prevent the prefetching if the template is already in the cache
        //     }
        //     $http.get(template).success(function(t) {
        //         $templateCache.put(template, t);
        //     });
        // }

    });
}
