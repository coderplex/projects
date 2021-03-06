/*!
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
/* eslint-env browser */
(function() {
  'use strict';

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors. See
  // http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features
  var isLocalhost = Boolean(window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
    );

  if ('serviceWorker' in navigator &&
      (window.location.protocol === 'https:' || isLocalhost)) {
    navigator.serviceWorker.register('service-worker.js')
    .then(function(registration) {
      // updatefound is fired if service-worker.js changes.
      registration.onupdatefound = function() {
        // updatefound is also fired the very first time the SW is installed,
        // and there's no need to prompt for a reload at that point.
        // So check here to see if the page is already controlled,
        // i.e. whether there's an existing service worker.
        if (navigator.serviceWorker.controller) {
          // The updatefound event implies that registration.installing is set:
          // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
          var installingWorker = registration.installing;

          installingWorker.onstatechange = function() {
            switch (installingWorker.state) {
              case 'installed':
                // At this point, the old content will have been purged and the
                // fresh content will have been added to the cache.
                // It's the perfect time to display a "New content is
                // available; please refresh." message in the page's interface.
                break;

              case 'redundant':
                throw new Error('The installing ' +
                                'service worker became redundant.');

              default:
                // Ignore
            }
          };
        }
      };
    }).catch(function(e) {
      console.error('Error during service worker registration:', e);
    });
  }

  // Your custom JavaScript goes here
  $('ul.nav li.dropdown')
    .hover(function() {
      $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500);
    }, function() {
      $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);
    });
    
  const config = {
    apiKey: "AIzaSyCaZeo-79S28RBUkw60q7JfTMaQ0KdH-Bk",
    authDomain: "finance-c9170.firebaseapp.com",
    databaseURL: "https://finance-c9170.firebaseio.com",
    storageBucket: "finance-c9170.appspot.com",
  };
  
  firebase.initializeApp(config);
  
  firebase.auth().signInWithEmailAndPassword('idlike2dream@gmail.com', 'teleport')
  .then(() => {
    console.log('Successfully Signed In')
  })
  .then(readTransaction)
  .catch(function(error) {
    console.log(error)
  });

  function readTransaction() {
    const ref = firebase.database().ref().child('fcc-finance/transactions')
    
    ref.on('value', snapshot => {
      console.log(snapshot.val());
    });
  }
  
  function writeTransaction(transaction) {
    const ref = firebase.database().ref().child('u:ramana/fcc-finance/transactions')
    
    return ref.update({
      [Date.now()]: transaction
    })
  }
  
  $('.transaction button').click(function () {
    
    const type = $('.transaction type').val() || ""
    const amount = $('.transaction amount').val() || ""
    const description = $('.transaction description').val() || ""
    const tag = $('.transaction tag').val() || ""
    const date = $('.transaction date').val() || ""
    const account = $('.transaction account').val() || ""
    
    writeTransaction({
      type,
      amount,
      description,
      tag,
      date,
      account
    });
  })
  
})();
