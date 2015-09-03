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

    // override tabs css so it wont appear white on Android
    $ionicConfigProvider.tabs.style('standard');

    // @todo: CHECK THIS
    $ionicConfigProvider.templates.maxPrefetch(6);

    $stateProvider

        // .state('main', {
        //     url: "/main",
        //     abstract: true
        // })

        .state('home', {
            url: '/home',
            data: { hideTabsBar: true },
            templateUrl: 'templates/home.html',
            controller: 'HomeController as home',
            resolve: {
                cdm: function (localStorageService) {
                    // resolving data so it will be loaded before the view appears
                    return localStorageService.initializeCdmWithLocalStorage([{ about: {} }, { myfirst: []}, { aboutMe: [] }]);
                }
            }
            })
    
        .state('tab', {
            url: "/tab",
            abstract: true,
            templateUrl: "templates/tabs.html"
        })

        // Each tab has its own nav history stack
        .state('tab.smpc', {
            url: '/smpc',
            views: {
                'tab-hidden': {
                    templateUrl: 'templates/tab-smpc.html',
                    controller: 'ProductsController as smpc'
                }
            }
        })
        
        .state('tab.aboutme', {
            url: '/me',
            data: { hideTabsBar: true },
            views: {
                'tab-aboutme': {
                    templateUrl: 'templates/tab-about-me.html',
                    controller: 'DefaultController as vm'
                }
            }
        })
        
        .state('tab.aboutmeinfo', {
            url: '/meinfo',
            data: { hideTabsBar: true },
            views: {
                'tab-aboutme': {
                    templateUrl: 'templates/tab-about-me-info.html',
                    controller: 'AboutMeInfoController as vm'
                }
            }
        })
        
        .state('tab.aboutmeedit', {
            url: '/meedit',
            data: { hideTabsBar: true },
            views: {
                'tab-aboutme': {
                    templateUrl: 'templates/tab-about-me-edit.html',
                    controller: 'AboutMeAddEditController as vm'
                }
            }
        })
        
        .state('tab.smpcdetails', {
            url: '/smpc-details',
            views: {
                'tab-hidden': {
                    templateUrl: 'tab-smpc-details.html',
                    controller: 'ProductDetailsController as smpc'
                }
            }
        })
        .state('tab.products', {
            url: '/products',
            views: {
                'tab-products': {
                    templateUrl: 'templates/tab-products.html',
                    controller: 'ProductsController as products'
                }
            }
        })

        .state('tab.list', {
            url: '/list',
            views: {
                'tab-products': {
                    templateUrl: 'templates/tab-products-list.html',
                    controller: 'ProductsController as products'
                }
            }
        })

        .state('tab.details', {
            url: '/details',
            views: {
                'tab-products': {
                    templateUrl: 'templates/tab-product-details.html',
                    controller: 'ProductDetailsController as productDetails'
                }
            }
        })

        .state('tab.dosage', {
            url: '/dosage',
            views: {
                'tab-products': {
                    templateUrl: 'templates/tab-products-dosage.html',
                    controller: 'ProductsController as productDosage'
                }
            }
        })

        .state('tab.dosagedetails', {
            url: '/dosage-details',
            views: {
                'tab-products': {
                    templateUrl: 'templates/tab-products-dosage-details.html',
                    controller: 'ProductsController as productDosage'
                }
            }
        })

        .state('tab.info', {
            url: '/info',
            views: {
                'tab-info': {
                    templateUrl: 'templates/tab-info.html',
                    controller: 'InfoController as info'
                }
            }
        })

        .state('tab.infodetails', {
            url: '/infodetails',
            views: {
                'tab-info': {
                    templateUrl: 'templates/tab-info-details.html',
                    controller: 'InfoController as info'
                }
            }
        })

        .state('tab.about', {
            url: '/about',
            views: {
                'tab-about': {
                    templateUrl: 'templates/tab-about.html',
                    controller: 'DefaultController as vm'
                }
            }
        })
        

        .state('tab.aboutview', {
            url: '/about/view',
            data: { hideTabsBar: true },
            views: {
                'tab-about': {
                    templateUrl: 'templates/tab-about-view.html',
                    controller: 'AboutController as vm'
                }
            }
        })
        
        .state('tab.myfirst', {
            url: '/myfirst',
            views: {
                'tab-myfirst': {
                    templateUrl: 'templates/tab-myfirst.html',
                    controller: 'DefaultController as vm'
                }
            }
        })
        
        .state('tab.myfirst-add', {
            url: '/myfirstadd',
            data: { hideTabsBar: true },
            views: {
                'tab-myfirst': {
                    templateUrl: 'templates/tab-myfirst-add.html',
                    controller: 'MyFirstController as vm'
                }
            }
        })
        
        .state('tab.myfirst-view', {
            url: '/myfirstview',
            data: { hideTabsBar: true },
            views: {
                'tab-myfirst': {
                    templateUrl: 'templates/tab-myfirst-view.html',
                    controller: 'MyFirstViewController as vm'
                }
            }
        })
        

        .state('tab.music', {
            url: '/music',
            views: {
                'tab-hidden': {
                    templateUrl: 'templates/tab-zabava.html',
                    controller: 'MusicController as vm'
                }
            }
        })
        .state('calculator', {
            url: '/calculator',
            data: { hideTabsBar: true },
            templateUrl: 'templates/calculator.html',
            controller: 'CalculatorController as calculator'
        })

        .state('calendar', {
            url: '/calendar',
            data: { hideTabsBar: true },
            templateUrl: 'templates/calendar.html',
            controller: 'CalendarController as vm'
        });


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/home');

}