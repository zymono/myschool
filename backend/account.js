// import { getRandomValues } from "crypto";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getStorage, ref, listAll } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";
import { getDownloadURL, deleteObject, uploadString } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";


const blockedIP = [
  ""
]

const blockedCountry = [
  "RU",
  "CN",
  "KP",
  "IR"
]

export function checkAccount() {
  document.head.innerHTML += `<link rel="icon" type="image/x-icon" href="/images/fav.png"><script>
if(window.top != window.self){
    top.location.href = document.location.href;
}
</script>`

  const user = JSON.parse(window.localStorage.getItem('currentUser'))
  // window.localStorage.setItem('buid', user.uid)

  if (window.localStorage.getItem('uid') == null) {
    window.location.href = '/auth/admin.html?b=' + window.location
  } else {
    // try {
    //   getReports()
    // } catch {}
    // let mySound = new Audio('/music/welcome.mp3')
    // mySound.play()
  }

  return fetch('https://api.ipify.org/?format=json')
    .then(response => response.json())
    .then(data => {
      const ip = data.ip
      checkIp(ip)
      window.localStorage.setItem('ip', ip)
      return fetch(`https://ipapi.co/${data.ip}/json/`)
        .then(response => response.json())
        .then(data => {
          checkIp(ip, data.country_code)
          return {
            'ip': ip,
            'country': data.country,
            'region': data.region,
            'city': data.city,
            'postal': data.postal,
            'lat': data.latitude,
            'long': data.longitude,
            'cc': data.country_code
          };
        });
    })


  function checkIp(address, country) {
    if (blockedIP.includes(address)) {
      window.location.href = '/404/blocked/?reason=ACCESS_DENIED'
      document.body.remove()
    }

    if (blockedCountry.includes(country)) {
      window.location.href = '/404/blocked/?reason=GEOLOCATION_BLOCKED'
      document.body.remove()

    }
  }
}

export function checkAdmin() {
  if (window.localStorage.getItem('displayName') == 'LavaCraftBedrock') {

  } else {
    window.location.href = '/auth/?b=' + window.location
  }
}

export function checkIfUser() {
  if (window.localStorage.getItem('uid') == null) {
    window.location.href = '/auth'
  } else {
    // let mySound = new Audio('/music/welcome.mp3')
    // mySound.play()
  }
}

export async function checkPerms() {
  if (!window.localStorage.getItem('uid')) {
    window.location = `/auth/?b=${window.location}`
  }

  const apiUrl = '/api/checkBan'; // Replace this with your actual API URL

  // Sample user ID to check if it's banned
  const userId = window.localStorage.getItem('buid'); // Replace this with the user ID you want to check

  // Fetch request to check if the user is banned
  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ uid: userId }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (data.banned) {
        console.log(`User with ID ${userId} is banned until ${data.banEndTime}`);
        window.location = '/404/blocked/?reason=FORGING_USER_IDENTIFICATION'
      } else {
        console.log(`User with ID ${userId} is not banned.`);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });

  if (window.localStorage.getItem('uid')) {
    const response = await fetch('/api/info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uid: window.localStorage.getItem('uid') }),
    });

    function findCodeByUid(array, uidToFind) {
      const foundItem = array.find(item => item.uid === uidToFind);
      return foundItem ? foundItem.code : null;
    }

    if (response.ok) {
      const report = await response.json();
      console.log(report.data)
      console.log((report.data.team).includes(window.localStorage.getItem('buid')))
      // const codeFound = findCodeByUid(report.data.team, window.localStorage.getItem('buid'));

      //       console.log(codeFound)
      const codeFound = findCodeByUid(report.data.team, window.localStorage.getItem('buid'));

      const t = (report.data.team);
      if (codeFound) {
        console.log('Permission Granted!')

        const codeFound = findCodeByUid(report.data.team, window.localStorage.getItem('buid'));

        console.log(codeFound)
        if (codeFound) {
          if (codeFound !== window.localStorage.getItem('perm')) {
            window.localStorage.setItem('perm', codeFound)
            alert("Your Permission Codes Seem To Have Been Modified, We Have Reset Them.")
          }

          if (codeFound !== '22344') {
            try {
              document.getElementById('collab').remove()
              document.getElementById('collaborate').remove()
              document.getElementById('popup-form').remove()
              document.getElementById('team').remove()
              document.getElementById('editURL').remove()
              document.getElementById('policy').remove()
              document.getElementById('todo-popup').remove()

            } catch { }
            try {
              document.getElementById('domac').innerText = 'Link Now'
              console.log(document.getElementById('domac'))
            } catch { }
          }

          if (codeFound !== '22344' && String(window.location).includes('team')) {
            window.location.href = '/'
            alert('You Do Not Have Access To This Page')
          }
        } else {
          fetch('/api/ban/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              uid: window.localStorage.getItem('buid'),
              time: 24
            }),
          })
            .then(response => response.json())
            .then(data => {
              location.reload()
            })
        }

      } else {
        window.localStorage.setItem('uid', window.btoa(window.btoa(window.localStorage.getItem('buid'))))

        fetch('/api/ban/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            uid: window.localStorage.getItem('buid'),
            time: 24
          }),
        })
          .then(response => response.json())
          .then(data => {
            location.reload()
          })
      }
    }
  }

  // const user = JSON.parse(window.localStorage.getItem('currentUser'))
  // window.localStorage.setItem('buid', user.uid)

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  // const firebaseConfig = {
  //   apiKey: "AIzaSyDelFI3VdZG_0G_SEMWrmB_WKRcw3ZNWFw",
  //   authDomain: "auth-e7b21.firebaseapp.com",
  //   projectId: "auth-e7b21",
  //   storageBucket: "auth-e7b21.appspot.com",
  //   messagingSenderId: "877231972674",
  //   appId: "1:877231972674:web:7a629ac207bfca644168db",
  //   measurementId: "G-3CMXJWW5B6"
  // };
  // // Initialize Firebase
  // const app = initializeApp(firebaseConfig);

  // const storage = getStorage();

  // var get0 = 'zymono/' + window.localStorage.getItem("uid") + '/team/' + window.localStorage.getItem('buid')

  // if (window.localStorage.getItem('uid') == window.btoa(window.btoa(window.localStorage.getItem('buid'))) || window.localStorage.getItem('uid') == null) {} else {
  //   try {
  //   getDownloadURL(ref(storage, get0))
  //     .then((url) => {
  //       // `url` is the download URL for your variable

  //       const xhr = new XMLHttpRequest();

  //       xhr.open('GET', url);
  //       xhr.onload = function() {
  //         if (xhr.status === 200) {
  //           console.log('Permission Granted!');
  //         } else {
  //           console.error(xhr.statusText);
  //           alert('YOU ARE NOT ALLOWED TO BE ON THIS TEAM!');
  //           window.localStorage.setItem('uid', window.btoa(window.btoa(window.localStorage.getItem('buid'))))

  //           fetch('/api/ban/', {
  //             method: 'POST',
  //             headers: {
  //               'Content-Type': 'application/json',
  //             },
  //             body: JSON.stringify({ 
  //               uid: window.localStorage.getItem('buid'),
  //               time: 24
  //             }),
  //           })
  //             .then(response => response.json())
  //             .then(data => {
  //               location.reload()
  //             })
  //         }
  //       };

  //       xhr.onerror = function(error) {
  //         console.error(error);
  //         alert('YOU ARE NOT ALLOWED TO BE ON THIS TEAM!');
  //                     window.localStorage.setItem('uid', window.btoa(window.btoa(window.localStorage.getItem('buid'))))

  //           fetch('/api/ban/', {
  //             method: 'POST',
  //             headers: {
  //               'Content-Type': 'application/json',
  //             },
  //             body: JSON.stringify({ 
  //               uid: window.localStorage.getItem('buid'),
  //               time: 24
  //             }),
  //           })
  //             .then(response => response.json())
  //             .then(data => {
  //               location.reload()
  //             })
  //       };

  //       xhr.send();
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       alert('YOU ARE NOT ALLOWED TO BE ON THIS TEAM!');
  //                   window.localStorage.setItem('uid', window.btoa(window.btoa(window.localStorage.getItem('buid'))))

  //           fetch('/api/ban/', {
  //             method: 'POST',
  //             headers: {
  //               'Content-Type': 'application/json',
  //             },
  //             body: JSON.stringify({ 
  //               uid: window.localStorage.getItem('buid'),
  //               time: 24
  //             }),
  //           })
  //             .then(response => response.json())
  //             .then(data => {
  //               location.reload()
  //             })
  //     });
  // } catch (error) {
  //   console.error(error);
  //   alert('Error accessing database.');
  // }
  // }
  //end


  // var get2 = `zymono/user/${window.localStorage.getItem('buid')}/team`

  // getDownloadURL(ref(storage, get2))
  //   .then((url) => {
  //     // // `url` is the download URL for your variable

  //     const xhr = new XMLHttpRequest();

  //     xhr.open('GET', url);
  //     xhr.onload = function() {
  //       if (xhr.status === 200) {
  //         console.log(xhr.responseText);

  //         if (xhr.responseText !== window.localStorage.getItem('uid')) {
  //           window.localStorage.setItem('uid', xhr.responseText)
  //           alert("Your Panel ID Seem To Have Been Modified, We Have Reset It.")
  //           document.location.reload()
  //         }




  //       } else {
  //         console.error(xhr.statusText);
  //         const err3 = error

  //       }
  //     };
  //     xhr.onerror = function(error) {
  //       console.error(error);
  //       const err3 = error

  //     };
  //     xhr.send();


  //   }) //end


  // var get = `zymono/user/${window.localStorage.getItem('buid')}/team`

  // getDownloadURL(ref(storage, get))
  //   .then((url) => {
  //     // // `url` is the download URL for your variable

  //     const xhr = new XMLHttpRequest();

  //     xhr.open('GET', url);
  //     xhr.onload = function() {
  //       if (xhr.status === 200) {
  //         console.log(xhr.responseText);


  //         var get1 = `zymono/user/${window.localStorage.getItem('buid')}/perm`

  //         getDownloadURL(ref(storage, get1))
  //           .then((url) => {
  //             // // `url` is the download URL for your variable

  //             const xhr = new XMLHttpRequest();

  //             xhr.open('GET', url);
  //             xhr.onload = function() {
  //               if (xhr.status === 200) {
  //                 console.log(xhr.responseText);

  //                 if (xhr.responseText !== window.localStorage.getItem('perm')) {
  //                   window.localStorage.setItem('perm', xhr.responseText)
  //                   alert("Your Permission Codes Seem To Have Been Modified, We Have Reset Them.")
  //                 }

  //                 if (xhr.responseText !== '22344') {
  //                   try {
  //                     document.getElementById('collab').remove()
  //                     document.getElementById('collaborate').remove()
  //                     document.getElementById('popup-form').remove()
  //                     document.getElementById('team').remove()
  //                     document.getElementById('editURL').remove()
  //                     document.getElementById('policy').remove()
  //                     document.getElementById('todo-popup').remove()

  //                   } catch { }
  //                   try {
  //                     document.getElementById('domac').innerText = 'Link Now'
  //                     console.log(document.getElementById('domac'))
  //                   } catch { }
  //                 }

  //                 if (xhr.responseText !== '22344' && String(window.location).includes('team')) {
  //                   window.location.href = '/'
  //                   alert('You Do Not Have Access To This Page')
  //                 }

  //               } else {
  //                 console.error(xhr.statusText);
  //                 const err3 = error

  //               }
  //             };
  //             xhr.onerror = function(error) {
  //               console.error(error);
  //               const err3 = error

  //             };
  //             xhr.send();


  //           }) //end



  //       } else {
  //         console.error(xhr.statusText);
  //         const err3 = error

  //       }
  //     };
  //     xhr.onerror = function(error) {
  //       console.error(error);
  //       const err3 = error

  //     };
  //     xhr.send();


  //   }) //end

  //   var get3 = `zymono/user/${window.localStorage.getItem('buid')}/silver`

  //   getDownloadURL(ref(storage, get3))
  //   .then((url) => {
  //     // // `url` is the download URL for your variable

  //     const xhr = new XMLHttpRequest();

  // xhr.open('GET', url);
  // xhr.onload = function () {
  //   if (xhr.status === 200) {
  //     console.log(xhr.responseText);

  //     if (xhr.responseText !== 't' && window.localStorage.getItem('+')) {
  //       window.localStorage.removeItem('+')
  //       alert("Please do not try to fake having premium!")
  //     }

  //     if (xhr.responseText == 't') {
  //       window.localStorage.setItem('+', 'true')
  //     }


  //   } else {
  //     console.error(xhr.statusText);
  //       const err3 = error

  //   }
  // };
  // xhr.onerror = function (error) {
  //   console.error(error);
  //     const err3 = error

  // };
  // xhr.send();


  //   }) //end

  // if (window.localStorage.getItem('termsAgreed') !== 'true') {
  //   window.location = '/policy/terms/review'
  // }

  document.head.innerHTML += `<link rel="icon" type="image/x-icon" href="/images/fav.png"><script>
if(window.top != window.self){
    top.location.href = document.location.href;
}
</script>`


  fetch('/sub-info', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ uid: window.localStorage.getItem('uid') }),
  })
    .then(response => response.json())
    .then(data => {
      // Handle the response
      if (data.status == 'active') {
        window.localStorage.setItem('plan', data.plan)
      } else {
        window.localStorage.removeItem('plan')

        try {
          document.querySelector('#desc').value = 'Premium Required'
          document.querySelector('#desc').disabled = true
          document.querySelector('#description').value = 'Premium Required'
          document.querySelector('#description').disabled = true
          document.querySelector('#banner').value = 'Premium Required'
          document.querySelector('#banner').disabled = true
        } catch {

        }
      }
    })
    .catch(error => {
      console.error('Error creating payment:', error);
    });

  // Function to check if the URL hash matches the ID and show the popup
  function showPopupIfHashMatches() {
    try {
      const popupId = "todo-popup";
      const hash = window.location.hash.substr(1); // Get the hash without the "#" symbol

      if (hash === '') {
        const popupDiv = document.getElementById(popupId);
        if (popupDiv) {
          popupDiv.style.display = "block"; // Show the popup
        }
      }
    } catch (error) {
    }
  }

  // Listen for the hashchange event and call the function
  window.addEventListener("hashchange", showPopupIfHashMatches);
}

export function checkPlans() {
  //   try {
  //   const firebaseConfig = {
  //   apiKey: "AIzaSyDelFI3VdZG_0G_SEMWrmB_WKRcw3ZNWFw",
  //   authDomain: "auth-e7b21.firebaseapp.com",
  //   projectId: "auth-e7b21",
  //   storageBucket: "auth-e7b21.appspot.com",
  //   messagingSenderId: "877231972674",
  //   appId: "1:877231972674:web:7a629ac207bfca644168db",
  //   measurementId: "G-3CMXJWW5B6"
  // };
  //   // Initialize Firebase
  //   const app = initializeApp(firebaseConfig);


  // const storage = getStorage();

  fetch('/sub-info', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ uid: window.localStorage.getItem('uid') }),
  })
    .then(response => response.json())
    .then(data => {
      // Handle the response
      if (data.status == 'active') {
        window.localStorage.setItem('plan', data.plan)
      } else {
        window.localStorage.removeItem('plan')

        try {
          document.querySelector('#desc').value = 'Premium Required'
          document.querySelector('#desc').disabled = true
          document.querySelector('#description').value = 'Premium Required'
          document.querySelector('#description').disabled = true
          document.querySelector('#banner').value = 'Premium Required'
          document.querySelector('#banner').disabled = true
        } catch {

        }
      }
    })
    .catch(error => {
      console.error('Error creating payment:', error);
    });

  //   var get2 = `zymono/user/${window.localStorage.getItem('buid')}/personal`


  //   getDownloadURL(ref(storage, get2))
  //   .then((url) => {
  //     // // `url` is the download URL for your variable

  //     const xhr = new XMLHttpRequest();

  // xhr.open('GET', url);
  // xhr.onload = function () {
  //   if (xhr.status === 200) {
  //     console.log(xhr.responseText);

  //     if (xhr.responseText !== 't' && window.localStorage.getItem('personal') == 'true') {
  //       window.localStorage.removeItem('personal')
  //       document.reload()
  //     } else if (xhr.responseText == 't') {
  //       window.localStorage.setItem('personal', 'true')      
  //     } else {
  //       window.localStorage.removeItem('personal')
  //       alert('Fatal server error.')
  //     }
  //     return



  //   } else {

  //   window.localStorage.removeItem('personal')

  //       document.reload()
  //   }
  // };
  // xhr.onerror = function () {

  //   window.localStorage.removeItem('personal')
  //   alert(error)
  //       document.reload()
  // };
  // xhr.send();


  //   }).catch((error) => {
  //   window.localStorage.removeItem('personal')
  //     document.reload()
  // }); //end

  // } catch (error) {

  //       window.localStorage.removeItem('personal')
  //       document.reload()
  //       alert(error)
  // }

  //   if (window.localStorage.getItem('termsAgreed') !== 'true') {
  //     window.location = '/policy/terms/review'
  //   }

  //   const user = JSON.parse(window.localStorage.getItem('currentUser'))
  //   window.localStorage.setItem('buid', user.uid)
}

if (!window.localStorage.getItem('admin')) {
  setInterval(function() {
    console.log('%cBe Careful Do Not Paste Anything Here If You Don\'t Know What You Are Doing, It Could Give Hackers Access To Your Account!', 'color: red; font-size: 40px; font-weight: bold;');
    console.log('%cIf you do know what you are doing you should contribute to our development at https://zymono.com/contribute!', 'color: green; font-size: 20px;');
    console.log('%cDo NOT abuse bugs in any Zymono systems!', 'color: orange; font-size: 20px;');
  }, 2000)
}
