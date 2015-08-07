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
            triggerRule: triggerRule
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

            return (callback || angular.noop)(params);
        }

     function ruleNeofenSirup(value) {
          var rule = parseInt(value);

          if(rule === undefined) return;

          if(rule < 5) {
             return {
              error: "Kilaža ne dovoljna za korištenje datog lijka, molim vas kontaktirajte ljekara ili apotekara za dodatne informacije."
             };
          }
          if(rule === 5) {
            return {
              error: false,
              measure: '½ žličice',
              dose: '50',
              daily: '3 puta dnevno'
            };
          }
          if(rule > 5 && rule < 11) {
            return {
              error: false,
              measure: '½ -¾ kaščica',
              dose:  '50-75',
              daily: '3 puta dnevno'
            };
          }
          if(rule >= 11 && rule < 17) {
            return {
              error: false,
              measure: '¾ -1 kaščica',
              dose:  '75-100',
              daily: '3 puta dnevno'
            };
          } 
          if(rule >= 17 && rule < 22) {
            return {
              error: false,
              measure: '1 -1 ¼ kaščica',
              dose:  '100-125',
              daily: '3 puta dnevno'
            };
          }
          if(rule >= 22 && rule < 28) {
            return {
              error: false,
              measure: '1 ¼ -1 ½ kaščica',
              dose:  '125-150',
              daily: '3 puta dnevno'
            };
          }
          if(rule >= 28 && rule < 33) {
            return {
              error: false,
              measure: '1 ½ -2 kaščica',
              dose:  '150-200',
              daily: '3 puta dnevno'
            };
          }
          if(rule >= 33 && rule < 43) {
            return {
              error: false,
              measure: '2 - 3 kaščica',
              dose:  '200-300',
              daily: '3 puta dnevno'
            };
          }
          if(rule >= 43) {
            return {
              error: false,
              measure: '2 - 3 kaščica',
              dose:  '200-400',
              daily: '3 puta dnevno'
            };
          }

      }

      function ruleLupocetSirup(value) {
        var rule = parseInt(value);

        if(rule === undefined) return;

        if(rule < 5) {
            return {
              error: false,
              measure: '1/2 kaščice',
              daily: '3 do 4 puta na dan'
            };
         }
        if(rule >= 5 && rule < 10) {
            return {
              error: false,
              measure: '1/2 - 1 kaščica',
              daily: '3 do 4 puta na dan'
            };
         }
        if(rule >= 10 && rule < 20) {
            return {
              error: false,
              measure: '1 - 2 kaščica',
              daily: '3 do 4 puta na dan'
            };
         }
        if(rule >= 20 && rule < 40) {
            return {
              error: false,
              measure: '2 - 4 kaščica',
              daily: '3 do 4 puta na dan'
            };
         }
        if(rule >= 40) {
            return {
              error: false,
              measure: '2 - 4 kaščica',
              daily: '3 do 4 puta na dan',
              warning: 'NAPOMENA: lijek je namjenjen za djecu do 12 godina i do 40 kg tjelsne mase, kontaktirajte lijekara ili apotekara za više informacija!'
            };
         }
      }

      function ruleNeofenCepiciSmall(value) {
         var rule = parseInt(value);

         if(rule === undefined) return;

         if(rule < 6) {
           return {
             error: "Kilaža ne dovoljna za korištenje datog lijka, molim vas kontaktirajte ljekara ili apotekara za dodatne informacije."
           };
         }
         if(rule >= 6 && rule < 8) {
            return {
              error: false,
              measure: '1 čepić',
              daily: '3 puta na dan u razmaku od 6-8 sati'
            };
         }
        if(rule >= 8 && rule <= 12) {
            return {
              error: false,
              measure: '1 čepić',
              daily: '4 puta na dan u razmaku od 6 sati'
            };
         }
        if(rule > 12) {
            return {
              error: false,
              measure: '1 čepić',
              daily: '4 puta na dan u razmaku od 6 sati',
              warning: 'NAPOMENA: lijek je namjenjen za djecu do 2 godine i do 12 kg tjelsne mase, kontaktirajte lijekara ili apotekara za više informacija!'
            };
         }

      }

      function ruleNeofenCepici(value) {
         var rule = parseInt(value);

         if(rule === undefined) return;

         if(rule < 12) {
           return {
             error: "Kilaža malena za korištenje datog lijeka, molim vas kontaktirajte ljekara ili apotekara za dodatne informacije."
           };
         }
         if(rule > 12 && rule < 17) {
            return {
              error: false,
              measure: '1 čepić',
              daily: '3 puta na dan u razmaku od 6-8 sati'
            };
         }
        if(rule >= 17 && rule <= 21) {
            return {
              error: false,
              measure: '1 čepić',
              daily: '4 puta na dan u razmaku od 6 sati'
            };
         }
        if(rule > 21) {
            return {
              error: false,
              measure: '1 čepić',
              daily: '4 puta na dan u razmaku od 6 sati',
              warning: 'NAPOMENA: lijek je namjenjen za djecu do 6 godina i do 20,5 kg tjelsne mase, kontaktirajte lijekara ili apotekara za više informacija!'
            };
         }
      }

      function ruleLupocetCepici(value) {
         var rule = parseInt(value);

         if(rule === undefined) return;

         if(rule < 5) {
           return {
              error: false,
              measure: '1/2 čepić',
              daily: '3 - 4 puta na dan u razmaku od 6-8 sati'           
            };
         }
         if(rule > 5 && rule < 10) {
            return {
              error: false,
              measure: '1/2 -1 čepić',
              daily: '3 - 4 puta na dan u razmaku od 6-8 sati'
            };
         }
        if(rule >= 10 && rule <= 20) {
            return {
              error: false,
              measure: '1 - 2 čepića',
              daily: '3 - 4 puta na dan u razmaku od 6-8 sati'
            };
         }
        if(rule > 21) {
            return {
              error: false,
              measure: '1 - 2 čepića',
              daily: '3 - 4 puta na dan u razmaku od 6-8 sati',
              warning: 'NAPOMENA: lijek je namjenjen za djecu do 5 godina i do 20 kg tjelsne mase, kontaktirajte lijekara ili apotekara za više informacija!'
            };
         }

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

        function navigate(key, param, modal) {

            if (param) params = param;
            
            if(modal) modal.hide();

            // $ionicHistory.nextViewOptions({
            //     disableAnimate: true
            // });

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
                 case 'music':
                    $state.go('tab.music');
                    break;
                 case 'calendar':
                    $state.go('calendar');
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

// for developemnt on browser
if (!window.cordova) {
    window.Media = function(src, mediaSuccess, mediaError, mediaStatus) {
        // src: A URI containing the audio content. (DOMString)
        // mediaSuccess: (Optional) The callback that executes after a Media object has completed the current play, record, or stop action. (Function)
        // mediaError: (Optional) The callback that executes if an error occurs. (Function)
        // mediaStatus: (Optional) The callback that executes to indicate status changes. (Function)

        if (typeof Audio !== "function" && typeof Audio !== "object") {
            console.warn("HTML5 Audio is not supported in this browser");
        }
        var sound = new Audio();
        sound.src = src;
        sound.addEventListener("ended", mediaSuccess, false);
        sound.load();

        return {
            // Returns the current position within an audio file (in seconds).
            getCurrentPosition: function(mediaSuccess, mediaError) {
                mediaSuccess(sound.currentTime);
            },
            // Returns the duration of an audio file (in seconds) or -1.
            getDuration: function() {
                return isNaN(sound.duration) ? -1 : sound.duration;
            },
            // Start or resume playing an audio file.
            play: function() {
                sound.play();
            },
            // Pause playback of an audio file.
            pause: function() {
                sound.pause();
            },
            start: function() {
                sound.start();
            },
            // Releases the underlying operating system's audio resources. Should be called on a ressource when it's no longer needed !
            release: function() {},
            // Moves the position within the audio file.
            seekTo: function(milliseconds) {}, // TODO
            // Set the volume for audio playback (between 0.0 and 1.0).
            setVolume: function(volume) {
                sound.volume = volume;
            },
            // Start recording an audio file.
            startRecord: function() {},
            // Stop recording an audio file.
            stopRecord: function() {},
            // Stop playing an audio file.
            stop: function() {
                sound.pause();
                if (mediaSuccess) {
                    mediaSuccess();
                }
            } // TODO
        };
    };
}

