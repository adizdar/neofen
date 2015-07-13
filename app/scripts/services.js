angular.module('neofen.services')

.factory('Chats', function() {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var chats = [{
        id: 0,
        name: 'Ben Sparrow',
        lastText: 'You on your way?',
        face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
    }, {
        id: 1,
        name: 'Max Lynx',
        lastText: 'Hey, it\'s me',
        face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
    }, {
        id: 2,
        name: 'Adam Bradleyson',
        lastText: 'I should buy a boat',
        face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
    }, {
        id: 3,
        name: 'Perry Governor',
        lastText: 'Look at my mukluks!',
        face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
    }, {
        id: 4,
        name: 'Mike Harrington',
        lastText: 'This is wicked good ice cream.',
        face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
    }];

    return {
        all: function() {
            return chats;
        },
        remove: function(chat) {
            chats.splice(chats.indexOf(chat), 1);
        },
        get: function(chatId) {
            for (var i = 0; i < chats.length; i++) {
                if (chats[i].id === parseInt(chatId)) {
                    return chats[i];
                }
            }
            return null;
        }
    };
});

(function() {

    'use strict';

    angular
        .module('neofen.services')
        .factory('calculatorRules', calculatorRules);

    calculatorRules.$inject = ['$log'];

    function calculatorRules($log) {

        var rules = {
            'lupocet120sirup': ruleLupocetSirup,
            'neofen100sirup': ruleNeofenSirup,
            'neofen60cepici': ruleNeofenCepiciSmall,
            'neofen125cepici': ruleNeofenCepici,
            'lupocet120cepici': ruleLupocetCepici
        };

        var service = {
            triggerRule: tirggetRule
        };

        return service;

        /////////////////////////

        function triggerRule(key, params) {
            var callback;

            if (!angular.isDefined(rules) || !rules.hasOwnProperty(key)) {
                $log.error('Rules object or key is not defined, factory: calculatorRules');
                return;
            }

            callback = rules[key];

            if (!callback || typeof callback !== 'function') {
                $log.error('Callback for key: ' + key + ' is not defined, factory: calculatorRules');
                return;
            }

            if (!params) {
                $log.error('Params is not defined, factory: calculatorRules');
                return;
            }

            (callback || angular.noop)(params);
        }

    }

})();

(function() {

    'use strict';

    angular
        .module('neofen.services')
        .factory('navigationUtil', navigationUtil);

    navigationUtil.$inject = ['$log', '$ionicHistory', '$state'];

    function navigationUtil($log, $ionicHistory, $state) {

        var service = {
            navigate: navigate
        };

        return service;

        /////////////////////////

        function navigate(key) {

            $ionicHistory.nextViewOptions({
                disableAnimate: true
            });

            switch (key) {
                case 'calculator':
                    $state.go('calculator');
                    break;
                case 'products':
                    $state.go('tab.products');
                    break;
                case 'products-list':
                    $state.go('tab.list');
                    break;
                case 'products-details':
                    $state.go('tab.details');
                    break;
            }

        }
    }

})();