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
            navigate: navigate,
            storeNavigationParam: storeNavigationParam,
            getNavigationParam: getNavigationParam
        };

        var params = null;

        return service;

        /////////////////////////

        function navigate(key, param) {

            if (param) params = param;

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
                case 'products-dosage':
                    $state.go('tab.dosage');
                    break;
                case 'products-dosage-details':
                    $state.go('tab.dosagedetails');
                    break;
            }

        }

        function storeNavigationParam(param) {
            params = param;
        }

        function getNavigationParam() {
            return params;
        }
    }

})();

(function() {

    'use strict';

    angular
        .module('neofen.services')
        .factory('productDetails', productDetails);

    productDetails.$inject = ['$log', '$http'];

    function productDetails($log, $http) {

        var service = {
            getFullProductDetails: getFullProductDetails,
            getProductByKey: getProductByKey,
            getDosageDetails: getDosageDetails
        };

        var productProperties = {
            'red': {
                'color': 'rgb(215,0,9)',
                'star': 'images/redstar.png',
                'borderColor': 'rgb(244,171,171)'
            },
            'blue': { // directive takes by default blue
                'color': null,
                'star': null,
                'borderColor': null
            }
        };

        var product = {
            neofensirup: {
                'title': 'NEOFEN',
                'subTitle': 'sirup 100 mg/5 ml',
                'lessText': 'NEOFEN sirup je nesteroidni protuupalni lijek koji snižava tjelesnu temperaturu i ublažava bol.',
                'fullText': 'Neofen sirup namijenjen je za liječenje djece starije od 3 mjeseca. Mogu ga koristiti i odrasli. Namijenjen je za kratkotrajnu upotrebu u sljedećim slučajevima: snižavanje tjelesne temperature kod prehlade, gripe i drugijh upalnih bolesti; kao reakcija na primljenu vakcinu. Ublažavanje blagih do srednje jakih bolova različitog porijekla (glavobolja, uhobolja, grlobolja, zubobolja).',
                'imgUrl': 'images/neofens.png',
                'details': productProperties.red
            },
            neofencepici60: {
                'title': 'NEOFEN',
                'subTitle': 'čepići 60 mg',
                'lessText': 'NEOFEN 60 mg čepići sadrže ibuprofen koji pripada grupi nesteroidnih protuupalnih lijekova.',
                'fullText': 'Neofen čepići sadrže ibuprofen koji se primjenjuje kod bolova i vrlo visoke temperature. Neofen čepići se posebno preporučuju ukoliko povišena tjelesna temperatura ne reguje na paracetamol ili u stanjima kada je tjelesna temperatura vrlo visoka i kada njen daljnji rast može ugroziti dijete (dovesti do febrilnih konvulzija) te kada je potrebno brzo sniziti visoku temperaturu. Posebno su pogodni ukoliko djeca osjećaju bolove jer brzo i djelotvorno uklanjaju uhobolju, sinusobolju, grlobolju, glavobolju, bolove tokom rasta zubića, bolove nakon cijepljenja, bolove u mišićima, bolove nakon operativnih zahvata i druge različite blage i umjerene bolove kod djece.',
                'imgUrl': 'images/cepici.png',
                'details': productProperties.red
            },
            neofencepici125: {
                'title': 'NEOFEN',
                'subTitle': 'čepići 125 mg',
                'lessText': 'NEOFEN 125 mg čepići sadrže ibuprofen koji pripada grupi nesteroidnih protuupalnih lijekova.',
                'fullText': 'Neofen čepići sadrže ibuprofen koji se primjenjuje kod bolova i vrlo visoke temperature. Neofen čepići se posebno preporučuju ukoliko povišena tjelesna temperatura ne reguje na paracetamol ili u stanjima kada je tjelesna temperatura vrlo visoka i kada njen daljnji rast može ugroziti dijete (dovesti do febrilnih konvulzija) te kada je potrebno brzo sniziti visoku temperaturu. Posebno su pogodni ukoliko djeca osjećaju bolove jer brzo i djelotvorno uklanjaju uhobolju, sinusobolju, grlobolju, glavobolju, bolove tokom rasta zubića, bolove nakon cijepljenja, bolove u mišićima, bolove nakon operativnih zahvata i druge različite blage i umjerene bolove kod djece.',
                'imgUrl': 'images/cepici125.png',
                'details': productProperties.red
            },
            lupocetsirup: {
                'title': 'LUPOCET',
                'subTitle': 'sirup',
                'lessText': 'LUPOCET je lijek koji sadrži paracetamol i izdaje se bez recepta. Koristi se za snižavanje povišene tjelesne temperature i za ublažavanje boli.',
                'fullText': 'LUPOCET sirup i Lupocet čepići namijenjeni su djeci. Prikladni su za snižavanje povišene tjelesne temperature koja je povezana s prehladom, gripom, dječjim zaraznim bolestima (npr. vodene kozice, hripavac, ospice, zaušnjaci) ili reakcijom na cijepljenje, kao i za ublažavanje zubobolje, glavobolje, grlobolje, boli pri nicanju zuba, nakon operacija i ozljeda te boli u mišićima i zglobovima.',
                'imgUrl': 'images/lupocet.png',
                'details': productProperties.blue
            },
            lupocetcepici: {
                'title': 'LUPOCET',
                'subTitle': 'čepići',
                'lessText': 'LUPOCET je lijek koji sadrži paracetamol i izdaje se bez recepta. Koristi se za snižavanje povišene tjelesne temperature i za ublažavanje boli.',
                'fullText': 'LUPOCET sirup i Lupocet čepići namijenjeni su djeci. Prikladni su za snižavanje povišene tjelesne temperature koja je povezana s prehladom, gripom, dječjim zaraznim bolestima (npr. vodene kozice, hripavac, ospice, zaušnjaci) ili reakcijom na cijepljenje, kao i za ublažavanje zubobolje, glavobolje, grlobolje, boli pri nicanju zuba, nakon operacija i ozljeda te boli u mišićima i zglobovima.',
                'imgUrl': 'images/lupocetc.png',
                'details': productProperties.blue
            }
        };

        var dosageDetails = [{
                dob: '3-6 mj.',
                kg: '> 5 kg',
                kasika: '1⁄2 - 3⁄4 kašičice',
                doza: '50 mg'
            }, {
                dob: '6 - 11 mj.',
                kg: '6-8 kg',
                kasika: '1⁄2 - 3⁄4 kašičice',
                doza: '50-75 mg'
            }, {
                dob: '1-2 god.',
                kg: '6-8 kg',
                kasika: '3⁄4 - 1 kašičice',
                doza: '50-75 mg'
            }, {
                dob: '2-3 god.',
                kg: '11-16 kg',
                kasika: '3⁄4 - 1 kašičice',
                doza: '75-100 mg'
            }, {
                dob: '4-5 god.',
                kg: '17-21 kg',
                kasika: '1 - 1 1⁄4 kašičice',
                doza: '100-125 mg'
            }, {
                dob: '6-8 god.',
                kg: '22-27 kg',
                kasika: '1 - 1 1⁄4 kašičice',
                doza: '125-150 mg'
            }, {
                dob: '9-10 god.',
                kg: '28-32 kg',
                kasika: '1 1⁄2 -2 kašičice',
                doza: '150-200 mg'
            }, {
                dob: '11-12 god.',
                kg: '33-43 kg',
                kasika: '2-3 kašičice',
                doza: '200-300 mg'
            },

        ];

        return service;

        /////////////////////////

        function getFullProductDetails() {
            return product;
        }

        function getProductByKey(key) {
            return product[key];
        }

        function getDosageDetails() {
           return dosageDetails;
        }
    }

})();