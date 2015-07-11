angular.module('neofen')
    .run(runPlatform);

runPlatform.$inject = ['$ionicPlatform', '$http', '$templateCache', '$cordovaSplashscreen'];

function runPlatform($ionicPlatform, $http, $templateCache, $cordovaSplashscreen) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleLightContent();
        }

        setTimeout(function() {
            $cordovaSplashscreen.hide();
        }, 1000);
      

        // var templates = [
        //     // "calculator",
        //     // "home",
        //     // "tab-dash",
        //     "tabs"
        // ];

        // $templateCache.put('tabs.html');
        // $templateCache.put('calculator.html');

        // templates.forEach(function(tpl) {
        //     $http.get('templates/' + tpl + '.html', {
        //         cache: $templateCache
        //     });
        // })
    });
}