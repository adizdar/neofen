angular.module('neofen')
       .config(configSetup); 

configSetup.$inject = ['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider'];

function configSetup($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    // reomove text from back button on all views
     $ionicConfigProvider.backButton.previousTitleText(false).text('');

    // set tabs position 
    $ionicConfigProvider.tabs.position('bottom');

    // disable animations
    $ionicConfigProvider.views.transition('none');

    // override tabs css so it won appear white on Android
    $ionicConfigProvider.tabs.style('standard');

    $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
        url: "/tab",
        abstract: true,
        templateUrl: "templates/tabs.html"
    })

    .state('home', {
        url: '/home',
        data: {hideTabsBar:true},
        templateUrl: 'templates/home.html',
        controller: 'HomeController as home'                
    })

    // Each tab has its own nav history stack:
    .state('tab.products', {
        url: '/products',
        views: {
            'tab-products': {
                templateUrl: 'templates/tab-products.html',
                controller: 'ProductsController as products'
            }
        }
    })

    .state('tab.chats', {
        url: '/chats',
        views: {
            'tab-chats': {
                templateUrl: 'templates/tab-chats.html',
                controller: 'ChatsCtrl'
            }
        }
    })
        .state('tab.chat-detail', {
            url: '/chats/:chatId',
            views: {
                'tab-chats': {
                    templateUrl: 'templates/chat-detail.html',
                    controller: 'ChatDetailCtrl'
                }
            }
        })

    .state('tab.account', {
        url: '/account',
        views: {
            'tab-account': {
                templateUrl: 'templates/tab-account.html',
                controller: 'AccountCtrl'   
            }   
        }
    })
        .state('calculator', {
            url: '/calculator',
            data: {hideTabsBar:true},
            templateUrl: 'templates/calculator.html',
            controller: 'CalculatorController as calculator'
        });


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/home');

}