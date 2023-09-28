//Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";

// import { checkAccount, checkPerms } from '/backend/account.js'
// checkAccount()
// checkPerms()

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDelFI3VdZG_0G_SEMWrmB_WKRcw3ZNWFw",
  authDomain: "auth-e7b21.firebaseapp.com",
  projectId: "auth-e7b21",
  storageBucket: "auth-e7b21.appspot.com",
  messagingSenderId: "877231972674",
  appId: "1:877231972674:web:7a629ac207bfca644168db",
  measurementId: "G-3CMXJWW5B6"
};
export default firebaseConfig;
// Initialize Firebase
const app = initializeApp(firebaseConfig);


import { getStorage, ref, listAll } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";
import { getDownloadURL, deleteObject, uploadString } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";

import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js'

const image = new URLSearchParams(location.search).get('img') || null
console.log(image)
// CHECK IF DAILY USAGE QUOTA IS EXCEDED
// setDailyUsages(5)
if (window.localStorage.getItem('u12933')) { } else {
  setDailyUsages(0)
}

if (getDailyUsages() >= 6 && checkLocalStorage() == false || getDailyUsages() >= 11 && checkLocalStorage() == false && window.localStorage.getItem('plan') == 'PERSONAL') {
  document.querySelector('html').remove()
  console.log('DAILY USAGE QUOTA EXCEEDED')
  window.location.href = '/404/exceeded'
}


window.onload = function() {
  if (checkLocalStorage()) {
    console.log("It has been more than 24 hours since you last visited this page.");
    setLocalStorage();
  } else {
    console.log("It has not been 24 hours since you last visited this page.");
  }
}

import { save, loadFromCloud } from '/backend/storage.js'

var reportForm = document.getElementById("reportForm")

function randomString(length) {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');

  if (!length) {
    length = Math.floor(Math.random() * chars.length);
  }

  var str = '';
  for (var i = 0; i < length; i++) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }
  return str;
}


reportForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  let user1 = false
  console.log('test')
  var check = window.btoa(window.btoa(document.getElementById("game").value))
  // Replace with actual user ID
  const response = await fetch('/api/getInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ uid: check }),
  });

  if (response.ok) {
    const reports = await response.json();
    console.log(reports)
    reports.forEach(report => {
      if (report.id == check) {
        user1 = true
        if (image) {
          const imageUrl = image;
          const html = `<img src="${imageUrl}" alt="uploaded image"/>`;
          const file = randomString(16)



          var gameName = window.btoa(window.btoa(document.getElementById("game").value))

          var playerName = document.getElementById("name").value
          var reason = document.getElementById("reason").value


          fetch('//zymono.com/api/report', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': '6bYoHbN' //Do not edit this
            },
            body: JSON.stringify({
              id: gameName, //Panel Key from https://zymono.com/me/ (Same as API key)
              user: playerName, //User being reported
              imgURL: image, //Url of an image for evidence (You can leave this blank)
              reason: reason, //Reason for report
              device: document.getElementById("platform").value, //Platform (E.g. Minecraft, Xbox, Discord, etc)
              uid: window.localStorage.getItem('buid')
            })
          })

          setDailyUsages(getDailyUsages() + 1)

          window.location.href = `/reported/?platform=${document.getElementById("game").value}&who=${document.getElementById("game").value}&fn=${file}&u=${document.getElementById("name").value}&r=${document.getElementById("reason").value}&p=${document.getElementById("platform").value}&img=${image}`
        } else {

          document.getElementById('submit').disabled = true
          document.getElementById('submit').innerText = 'Loading'

          const apiKey = 'db2e08783da783967be5eb3f488a1e6a';
          const apiUrl = 'https://api.imgbb.com/1/upload';

          const formData = new FormData();
          const inputFile = document.getElementById('image-input').files[0];
          formData.append('image', inputFile);
          formData.append('key', apiKey);

          fetch(apiUrl, {
            method: 'POST',
            body: formData
          })
            .then(response => response.json())
            .then(data => {
              if (data.success) {
                const imageUrl = data.data.url;
                const html = `<img src="${imageUrl}" alt="uploaded image"/>`;
                const file = randomString(16)



                var gameName = window.btoa(window.btoa(document.getElementById("game").value))

                var playerName = document.getElementById("name").value

                var reason = document.getElementById("reason").value

                fetch('//zymono.com/api/report', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': '6bYoHbN' //Do not edit this
                  },
                  body: JSON.stringify({
                    id: gameName, //Panel Key from https://zymono.com/me/ (Same as API key)
                    user: playerName, //User being reported
                    imgURL: data.data.url, //Url of an image for evidence (You can leave this blank)
                    reason: reason, //Reason for report
                    device: document.getElementById("platform").value, //Platform (E.g. Minecraft, Xbox, Discord, etc)
                    uid: window.localStorage.getItem('buid')
                  })
                })

                // saveCloud(gameName + '/' + file + '/img.txt', data.data.url)

                // saveCloud(gameName + '/' + file + '/name.txt', playerName)

                // saveCloud('/list/' + playerName, playerName)

                // var reason = document.getElementById("reason").value
                // saveCloud(gameName + '/' + file + '/reason.txt', reason)

                // saveCloud(gameName + '/' + file + '/platform.txt', document.getElementById("platform").value)

                // saveCloud(gameName + '/' + file + '/uid.txt', window.localStorage.getItem('buid'))

                // saveCloud(gameName + '/' + file + '/id.txt', file)

                // //USER REPORTS DASHBOARD SENDER

                // saveCloud('ur/' + window.localStorage.getItem('buid') + '/' + file + '/name.txt', playerName)

                // saveCloud('ur/' + window.localStorage.getItem('buid') + '/' + file + '/reason.txt', reason)

                // saveCloud('ur/' + window.localStorage.getItem('buid') + '/' + file + '/platform.txt', document.getElementById("platform").value)

                // saveCloud('ur/' + window.localStorage.getItem('buid') + '/' + file + '/status.txt', "⚫ Sent To The Platform's Panel")

                // saveCloud('ur/' + window.localStorage.getItem('buid') + '/' + file + '/uid.txt', window.localStorage.getItem('buid'))

                setDailyUsages(getDailyUsages() + 1)

                // const i = sendNotif(gameName, file)

                window.location.href = `/reported/?platform=${document.getElementById("game").value}&who=${document.getElementById("game").value}&fn=${file}&u=${document.getElementById("name").value}&r=${document.getElementById("reason").value}&p=${document.getElementById("platform").value}&img=${data.data.url}`
              } else {
                alert('Error: ' + data.status_message);
              }
            })
            .catch(error => {
              console.error(error);
              document.getElementById('result').innerHTML = 'Error: ' + error.message;
            });
        }
      }
    })
  } else {
    console.error('Error fetching reports:', response.status);
  }

  document.getElementById('submit').disabled = true
  document.getElementById('submit').innerText = 'Loading'

  setTimeout(function() {
    if (user1 == false) {
      error('The Zymono ID entered was invalid!')
    }
  }, 100)


  //   const fileLocation = gameName + '/' +  randomString(16) + '.js'
  //   const content = "var player = " + playerName + "\n\ var reason = " + reason + "\n\ var gameName = " + gameName


  //   // const content = "export var player = ${playerName}
  //   //   export var reason = ${reason}
  //   //   export var gameName = ${gameName}"


  //   alert(content)

  //     var sr = "zymono/" + fileLocation

  //   const storage = getStorage();
  // const storageRef = ref(storage, sr);

  // uploadString(storageRef, content).then((snapshot) => {
  //   console.log('Uploaded raw string');

  //   })


});
// }

// setDailyUsages(13)

// console.log(getDailyUsages())

function setDailyUsages(int) {
  const uses = JSON.stringify(window.btoa(JSON.stringify(int)))

  window.localStorage.setItem('u12933', uses)
}

function getDailyUsages() {
  const val = Number(JSON.parse(window.atob(JSON.parse(window.localStorage.getItem('u12933')))))

  return val;
}

function setLocalStorage() {
  var now = new Date();
  var encodedTime = btoa(now.getTime());
  localStorage.setItem("lastVisitedTime", encodedTime);
  window.localStorage.removeItem('u12933')
}

function checkLocalStorage() {
  var lastVisitedTime = localStorage.getItem("lastVisitedTime");
  if (lastVisitedTime) {
    var decodedTime = atob(lastVisitedTime);
    var lastVisitedDate = new Date(decodedTime);
    var now = new Date();
    var timeDiff = now - lastVisitedDate;
    var hoursDiff = timeDiff / (1000 * 60 * 60);
    if (hoursDiff >= 24) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
}


function saveCloud(where, what) {
  var sr = "zymono/" + where

  const storage = getStorage();
  const storageRef = ref(storage, sr);

  uploadString(storageRef, what).then((snapshot) => {
    console.log('Uploaded raw string');

  })
}

// function updatemenu() {
//   if (document.getElementById('responsive-menu').checked == true) {
//     document.getElementById('menu').style.borderBottomRightRadius = '0';
//     document.getElementById('menu').style.borderBottomLeftRadius = '0';
//   }else{
//     document.getElementById('menu').style.borderRadius = '10px';
//   }
// }
const storage = getStorage();
const removeChar = (str, char) => str.split(char).join('');


var uid = removeChar(String(new URLSearchParams(location.search).get('g')), '/')

if (new URLSearchParams(location.search).get('g') == null || uid == '/') { } else { document.getElementById("game").value = uid }

// REPEATEDLY CHECK FOR BANNERS, DESCRIPTIONS, AND DOMAINS FOR THE GAME/APP.
//
//
//
const input = document.getElementById("game");

input.addEventListener("change", async function() {
  //Banner
  const response = await fetch('/api/info', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ uid: window.btoa(window.btoa(document.getElementById("game").value)) }),
  });

  if (response.ok) {
    const report = await response.json();
    console.log(report)

    document.getElementById("banner").src = report.data.banner || '//zymono.com/images/zymono.png'
    document.getElementById("policyURL").src = report.data.policy || '//legal.zymono.com/terms-of-service'
    document.getElementById("desc").innerText = report.data.description || 'Zymono'
    document.getElementById('domain').innerText = report.data.domain || '';
    document.getElementById('platform').value = report.data.platform || ''
    
  }

  // var get = 'zymono/' + window.btoa(window.btoa(document.getElementById('game').value)) + '/banner.txt'

  // getDownloadURL(ref(storage, get))
  //   .then((url) => {
  //     // // `url` is the download URL for your variable

  //     const xhr = new XMLHttpRequest();

  //     xhr.open('GET', url);
  //     xhr.onload = function() {
  //       if (xhr.status === 200) {


  //         // window.sessionStorage.setItem("reason", xhr.responseText)
  //         document.getElementById("banner").src = xhr.responseText

  //       } else {

  //       }
  //     };
  //     xhr.onerror = function(error) {

  //     };
  //     xhr.send();
  //   })

  // //Policy
  // var get = 'zymono/' + window.btoa(window.btoa(document.getElementById('game').value)) + '/policy.txt'

  // getDownloadURL(ref(storage, get))
  //   .then((url) => {
  //     // // `url` is the download URL for your variable

  //     const xhr = new XMLHttpRequest();

  //     xhr.open('GET', url);
  //     xhr.onload = function() {
  //       if (xhr.status === 200) {


  //         // window.sessionStorage.setItem("reason", xhr.responseText)
  //         document.getElementById("policyURL").src = xhr.responseText

  //       } else {

  //       }
  //     };
  //     xhr.onerror = function(error) {

  //     };
  //     xhr.send();
  //   })

  // //NAME/DESCRIPTION
  // var descGet = 'zymono/' + window.btoa(window.btoa(document.getElementById('game').value)) + '/desc.txt'


  // getDownloadURL(ref(storage, descGet))
  //   .then((url) => {
  //     // // `url` is the download URL for your variable

  //     const xhr = new XMLHttpRequest();

  //     xhr.open('GET', url);
  //     xhr.onload = function() {
  //       if (xhr.status === 200) {


  //         // window.sessionStorage.setItem("reason", xhr.responseText)
  //         document.getElementById("desc").innerText = xhr.responseText

  //       } else {

  //       }
  //     };
  //     xhr.onerror = function(error) {

  //     };
  //     xhr.send();
  //   })

  // //   //DEFAULT PLATFORM (NOT NEEDED YET)
  // // var platGet = 'zymono/' + window.btoa(window.btoa(uid)) + '/dp'


  // // getDownloadURL(ref(storage, platGet))
  // //   .then((url) => {
  // //     // // `url` is the download URL for your variable

  // //     const xhr = new XMLHttpRequest();

  // // xhr.open('GET', url);
  // // xhr.onload = function () {
  // //   if (xhr.status === 200) {
  // //     

  // //     // window.sessionStorage.setItem("reason", xhr.responseText)
  // //     document.getElementById("platform").value = xhr.responseText

  // //   } else {
  // //  
  // //   }
  // // };
  // // xhr.onerror = function (error) {
  // // 
  // // };
  // // xhr.send();
  // //   })

  // //DOMAIN (IF ANY)
  // var get = `/zymono/linked/${window.btoa(window.btoa(document.getElementById('game').value))}/domain`
  // console.log(get)
  // getDownloadURL(ref(storage, get))
  //   .then((url) => {
  //     // // `url` is the download URL for your variable

  //     const xhr = new XMLHttpRequest();

  //     xhr.open('GET', url);
  //     xhr.onload = function() {
  //       if (xhr.status === 200) {



  //         // window.sessionStorage.setItem("reason", xhr.responseText)
  //         document.getElementById('domain').innerText = xhr.responseText;

  //       } else {

  //         const err3 = error

  //       }
  //     };
  //     xhr.onerror = function(error) {
  //       const err3 = error

  //     };
  //     xhr.send();
  //   }) //end

  //
  //
  //
  //END OF REPEATED CHECK!
}, 2000);

//ON FIRST LOAD GET DOMAIN IMAGE AND BANNER OF "g" URL PARAMATER
//
//
//

// var get = 'zymono/' + window.btoa(window.btoa(uid)) + '/banner.txt'

// getDownloadURL(ref(storage, get))
//   .then((url) => {
//     // // `url` is the download URL for your variable

//     const xhr = new XMLHttpRequest();

//     xhr.open('GET', url);
//     xhr.onload = function() {
//       if (xhr.status === 200) {
//         console.log(xhr.responseText);

//         // window.sessionStorage.setItem("reason", xhr.responseText)
//         document.getElementById("banner").src = xhr.responseText

//       } else {
//         console.error(xhr.statusText);
//       }
//     };
//     xhr.onerror = function(error) {
//       console.error(error);
//     };
//     xhr.send();
//   })

// var descGet = 'zymono/' + window.btoa(window.btoa(uid)) + '/desc.txt'


// getDownloadURL(ref(storage, descGet))
//   .then((url) => {
//     // // `url` is the download URL for your variable

//     const xhr = new XMLHttpRequest();

//     xhr.open('GET', url);
//     xhr.onload = function() {
//       if (xhr.status === 200) {
//         console.log(xhr.responseText);

//         // window.sessionStorage.setItem("reason", xhr.responseText)
//         document.getElementById("desc").innerText = xhr.responseText

//       } else {
//         console.error(xhr.statusText);
//       }
//     };
//     xhr.onerror = function(error) {
//       console.error(error);
//     };
//     xhr.send();
//   })

// var platGet = 'zymono/' + window.btoa(window.btoa(uid)) + '/dp'


// getDownloadURL(ref(storage, platGet))
//   .then((url) => {
//     // // `url` is the download URL for your variable

//     const xhr = new XMLHttpRequest();

//     xhr.open('GET', url);
//     xhr.onload = function() {
//       if (xhr.status === 200) {
//         console.log(xhr.responseText);

//         // window.sessionStorage.setItem("reason", xhr.responseText)
//         document.getElementById("platform").value = xhr.responseText

//       } else {
//         console.error(xhr.statusText);
//       }
//     };
//     xhr.onerror = function(error) {
//       console.error(error);
//     };
//     xhr.send();
//   })

// var get = `/zymono/linked/${window.btoa(window.btoa(document.getElementById('game').value))}/domain`
// console.log(get)
// getDownloadURL(ref(storage, get))
//   .then((url) => {
//     // // `url` is the download URL for your variable

//     const xhr = new XMLHttpRequest();

//     xhr.open('GET', url);
//     xhr.onload = function() {
//       if (xhr.status === 200) {
//         console.log(xhr.responseText);


//         // window.sessionStorage.setItem("reason", xhr.responseText)
//         document.getElementById('domain').innerText = xhr.responseText;

//       } else {
//         console.error(xhr.statusText);
//         const err3 = error
//         createToast('error')
//       }
//     };
//     xhr.onerror = function(error) {
//       console.error(error);
//       const err3 = error
//       createToast('error')
//     };
//     xhr.send();
//   }) //end

// const listRef = ref(storage, 'zymono/users/domains/');

// listAll(listRef)
//   .then((res) => {
//     res.prefixes.forEach((folderRef) => {


//     });
//     res.items.forEach((itemRef) => {
//       // All the items under listRef.
//       // getDown(itemRef)


//       if (String(new URLSearchParams(location.search).get('p')).includes('https://' + itemRef.name)) {
//         var get = itemRef
//         console.log(get)
//         getDownloadURL(ref(storage, get))
//           .then((url) => {
//             // // `url` is the download URL for your variable
//             const xhr = new XMLHttpRequest();
//             xhr.open('GET', url);
//             xhr.onload = function() {
//               if (xhr.status === 200) {
//                 console.log(xhr.responseText);
//                 // window.sessionStorage.setItem("reason", xhr.responseText)
//                 document.getElementById('game').value = xhr.responseText;
//               } else {
//                 console.error(xhr.statusText);
//                 const err3 = error
//                 createToast('error')
//               }
//             };
//             xhr.onerror = function(error) {
//               console.error(error);
//               const err3 = error
//               createToast('error')
//             };
//             xhr.send();
//           }) //end


//       }
//     });
//   }).catch((error) => {
//     const err3 = error
//     createToast('error')
//     // Uh-oh, an error occurred!
//   });

// //Policy
// var get = 'zymono/' + window.btoa(window.btoa(document.getElementById('game').value)) + '/policy.txt'

// getDownloadURL(ref(storage, get))
//   .then((url) => {
//     // // `url` is the download URL for your variable

//     const xhr = new XMLHttpRequest();

//     xhr.open('GET', url);
//     xhr.onload = function() {
//       if (xhr.status === 200) {


//         // window.sessionStorage.setItem("reason", xhr.responseText)
//         document.getElementById("policyURL").src = xhr.responseText

//       } else {

//       }
//     };
//     xhr.onerror = function(error) {

//     };
//     xhr.send();
//   })

// const SK = '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';function _0x46c3(){var _0x13f92c=['20312oHwGRa','6WwxkAp','8qaSkBG','4135203Dpzlco','57cEdnaF','818440zwZnAJ','343630sLfaKc','576103Lvymuu','2378015OckXJV','4516981AucbIt','130EMBkvl'];_0x46c3=function(){return _0x13f92c;};return _0x46c3();}function _0x47c0(_0x1b7e2f,_0x43f0a7){var _0x46c345=_0x46c3();return _0x47c0=function(_0x47c08b,_0x134f0c){_0x47c08b=_0x47c08b-0x6e;var _0x3fffca=_0x46c345[_0x47c08b];return _0x3fffca;},_0x47c0(_0x1b7e2f,_0x43f0a7);}(function(_0x1115ee,_0x646463){var _0x2bb363=_0x47c0,_0x5b74fe=_0x1115ee();while(!![]){try{var _0x4372a6=parseInt(_0x2bb363(0x6f))/0x1+-parseInt(_0x2bb363(0x74))/0x2*(-parseInt(_0x2bb363(0x78))/0x3)+-parseInt(_0x2bb363(0x6e))/0x4+parseInt(_0x2bb363(0x71))/0x5*(-parseInt(_0x2bb363(0x75))/0x6)+-parseInt(_0x2bb363(0x72))/0x7+parseInt(_0x2bb363(0x76))/0x8*(parseInt(_0x2bb363(0x77))/0x9)+-parseInt(_0x2bb363(0x73))/0xa*(-parseInt(_0x2bb363(0x70))/0xb);if(_0x4372a6===_0x646463)break;else _0x5b74fe['push'](_0x5b74fe['shift']());}catch(_0x393e2b){_0x5b74fe['push'](_0x5b74fe['shift']());}}}(_0x46c3,0x55cb6));

// if (new URLSearchParams(window.location.search).get('usp') === 'extension') {
//   const sendEmail = () => {
//     const url = "https://api.sendgrid.com/v3/mail/send";
//     const emailBody = {
//       personalizations: [{ to: [{ email: "info@zymono.com" }] }],
//       from: { email: "alerts@zymono.com" },
//       subject: "Zymono Report Chrome Extension",
//       content: [{ type: "text/plain", value: "Someone has used the Zymono Report Chrome Extension to file a report." }],
//     };
//     fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${SK}`,
//       },
//       body: JSON.stringify(emailBody),
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         console.log("Email sent successfully!");
//       })
//       .catch((error) => {
//         console.error("Error sending email:", error);
//       });
//   };

//   sendEmail()
// }
async function op() {
  const response = await fetch('/api/info', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ uid: window.btoa(window.btoa(uid)) }),
  });
  
  if (response.ok) {
    const report = await response.json();
    console.log(report)
  
    document.getElementById("banner").src = report.data.banner || '//zymono.com/images/zymono.png'
    document.getElementById("policyURL").src = report.data.policy || '//legal.zymono.com/terms-of-service'
    document.getElementById("desc").innerText = report.data.description || 'Zymono'
    document.getElementById('domain').innerText = report.data.domain || '';
    document.getElementById('platform').value = report.data.platform || ''
  }
}
op()

function error(err) {
  const popup = document.querySelector('#popup-form')

  document.getElementById('error').innerHTML = err
  // Hide the popup container
  popup.style.display = 'block';
}

async function o1p() {
  console.log('ui')
  const response = await fetch('/api/getInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ uid: 'N/A' }),
  });

  if (response.ok) {
    console.log('tester1')
    const reports = await response.json();
    // console.log(reports)
    reports.forEach(report => {
      const list = document.getElementById('names')

      const item = `<option value="${window.atob(window.atob(report.id))}"></option>`

      list.innerHTML += item
    })
  }
}

o1p()