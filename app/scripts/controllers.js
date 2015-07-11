angular.module('neofen.controllers')

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function(chat) {
        Chats.remove(chat);
    };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats, $log) {
    $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope, $log, $filter) {
    var vm = this;

    vm.source = document.getElementsByClassName('abacus');
    vm.findTargetInSource = findTargetInSource;
    vm.toggleAbacus = toggleAbacus;
    vm.abacusActive = 0;

    function toggleAbacus(element, className, shouldToggle) {

        if (!element || !className || shouldToggle === false) return null;

        if (!angular.isDefined(element.hasClass))
            element = angular.element(element);

        if (element.hasClass(className)) {
            element.removeClass(className);
            vm.abacusActive--;
        } else {
            element.addClass(className);
            vm.abacusActive++;
        }

    }

    function findTargetInSource(target) {
        for (var i = vm.source.length - 1; i >= 0; i--) {
            if (vm.source[i] == target)
                return vm.source[i];
        }
    }

    $scope.test = function(event) {
        var target = angular.element(event.target),
            el = null;

        if (!vm || !vm.source) {
            $log.error('VM or Source is undefined in function');
            return;
        }

        if (angular.isDefined(target) && target.hasClass('abacus')) {
            for (var i = vm.source.length - 1; i >= 0; i--) {
                el = angular.element(vm.source[i]);

                if (!angular.isDefined(el) || el[0] === target[0]) break;

                if (vm.abacusActive && !target.hasClass('abacus-active')) 
                    vm.toggleAbacus(el, 'abacus-active', !el.hasClass('abacus-active'));
                else if(vm.abacusActive && target.hasClass('abacus-active')) 
                    vm.toggleAbacus(el, 'abacus-active',  el.hasClass('abacus-active'));
                else vm.toggleAbacus(el, 'abacus-active');
            }

            vm.toggleAbacus(target, 'abacus-active');
        }
    };


});

    angular
        .module('neofen.controllers')
        .controller('CalculatorController', CalculatorController);

    CalculatorController.$inject = ['$scope', '$log', '$rootScope'];  
    
    function CalculatorController($scope, $log, $rootScope) {

        var vm = this;

    }

    angular
        .module('neofen.controllers')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$log'];  
    
    function HomeController($scope, $log) {

        var vm = this;

    }

    angular
        .module('neofen.controllers')
        .controller('TabsController', TabsController);

    TabsController.$inject = ['$scope', '$log', '$rootScope'];  
    
    function TabsController($scope, $log, $rootScope) {

        var vm = this;
        $rootScope.hideTabs = null;

        // using $rootScope to hide tab on some screens
        $rootScope.$on('$stateChangeStart', function(event, toState) {
             $rootScope.hideTabs = toState.data && toState.data.hideTabsBar;
        });
    }

