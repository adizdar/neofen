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
                 case 'smpc':
                    $state.go('tab.smpc');
                    break;
                 case 'smpc-details':
                    $state.go('tab.smpcdetails');
                    break;
                 case 'info':
                    $state.go('tab.info');
                    break;
                 case 'info-details':
                    $state.go('tab.infodetails');
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
            getDosageDetails: getDosageDetails,
            getInfoDetails: getInfoDetails
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
                dob: '3 - 6 mj.',
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

        var infoDetails = {
          'povisenaTemperatura': { 
            'title': 'Šta je povišena temperatura'
          },
          'najBolesti': { 
            'title': 'Najčešće bolesti kod djece'
          },
          'izmjeritiTemperaturu' : {
            'title': 'Kako pravilno izmjeriti temperaturu'         
          },
          'visokaTemperatura' : {
            'title': 'Šta učiniti kod visoke temperature'
          },
          'snizitiTemperaturu' : {
            'title': 'Kako sniziti visoku temperaturu'
          },
          'fizikalneMjere' : {
            'title': 'Fizikalne mjere snižavanja temperature'
          },
          'bolKodDjece' : {
            'title': 'Bol kod djece'
          },
          'ublazavanjeBola' : {
            'title': 'Ublažavanje bola kod djece'
          }
        };

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

        function getInfoDetails(key) {
          return infoDetails[key];
        }
    }

})();



