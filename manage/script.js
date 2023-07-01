// Nope. This is a concept design, so no menu or filter toggles work. But it looks good, doesn't it? 

 // if (window.localStorage.getItem('uid') == null) {
 //    window.location.href = '//zymono.com/auth/admin.html?b=' + window.location + '/auth'
 //  } else {
 //    // let mySound = new Audio('/music/welcome.mp3')
 //    // mySound.play()
 //    console.log('%cBe Careful Do Not Paste Anything Here If You Don\'t Know What You Are Doing, It Could Give Hackers Access To Your Account!', 'color: red; font-size: 40px; font-weight: bold;');
 //    console.log('%cIf you do know what you are doing you should contribute to our development at https://zymono.com/contribute!', 'color: green; font-size: 20px;');
 //    console.log('%cDo NOT abuse bugs in any Zymono systems!', 'color: orange; font-size: 20px;');
 //  }

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

// const user = JSON.parse(window.localStorage.getItem('currentUser'));

const user = getAuth().currentUser
console.log(user)

const storage = getStorage();

let mySound = new Audio('/music/click.mp3')



function play() {
  mySound.play()
}



export function acceptReport(path, uid11, fileP) {
  deleteFile(path)

  saveCloud('ur/' + uid11 + '/' + fileP + '/status.txt', "✅ Accepted")
}

export function denyReport(path, uid11, fileP) {
  deleteFile(path)

  saveCloud('ur/' + uid11 + '/' + fileP + '/status.txt', "🚫 Denied")
}

function saveCloud(where, what) {
  var sr = "zymono/" + where

  const storage = getStorage();
  const storageRef = ref(storage, sr);

  uploadString(storageRef, what).then((snapshot) => {
    console.log(where);

  })
}

export function deleteFile(id) {
  // Create a reference to the file to delete
  document.getElementById(id).remove()
  console.log(document.getElementById(id))


  mySound.play()



  var delRef = ref(storage, id + '/name.txt');

  // Delete the file
  deleteObject(delRef).then(() => {
    // File deleted successfully
  }).catch((error) => {
    // Uh-oh, an error occurred!
    const err3 = error
    createToast('error')
  });

  var delRef = ref(storage, id + '/platform.txt');

  // Delete the file
  deleteObject(delRef).then(() => {
    // File deleted successfully
  }).catch((error) => {
    // Uh-oh, an error occurred!
    const err3 = error
    createToast('error')
  });

  var delRef = ref(storage, id + '/reason.txt');

  // Delete the file
  deleteObject(delRef).then(() => {
    // File deleted successfully
  }).catch((error) => {
    // Uh-oh, an error occurred!
    const err3 = error
    createToast('error')
  });


  var delRef = ref(storage, id + '/uid.txt');

  // Delete the file
  deleteObject(delRef).then(() => {
    // File deleted successfully

  }).catch((error) => {
    // Uh-oh, an error occurred!
    const err3 = error
    createToast('error')
  });


  var delRef = ref(storage, id + '/id.txt');

  // Delete the file
  deleteObject(delRef).then(() => {
    // File deleted successfully
    
  }).catch((error) => {
    // Uh-oh, an error occurred!
    const err3 = error
    createToast('error')
  });

  var delRef133 = ref(storage, id + '/img.txt');

  // Delete the file
  deleteObject(delRef133).then(() => {
    // File deleted successfully
    console.log(delRef133)
    createToast('success')
  }).catch((error) => {
    // Uh-oh, an error occurred!
    const err3 = error
    createToast('error')
  });
}

// Create a reference under which you want to list
const listRef = ref(storage, 'zymono/' + window.localStorage.getItem("uid"));


var report = 'error'
var newContent = 'error'
var newContent1 = 'error'

// Find all the prefixes and items.
listAll(listRef)
  .then((res) => {
    res.prefixes.forEach((folderRef) => {
      // All the prefixes under listRef.
      // You may call listAll() recursively on them.


      //   window.sessionStorage.setItem('c', Number(window.sessionStorage.getItem('c')) + 1)


      // if (window.localStorage.getItem('+') == null && window.sessionStorage.getItem('c') >= 2) {
      //   var delRef = ref(storage, folderRef_location.path);

      //   // Delete the file
      //   deleteObject(delRef).then(() => {
      //     // File deleted successfully
      //   }).catch((error) => {
      //     // Uh-oh, an error occurred!
      //      const err3 = error
      //       createToast('error')
      //   });
      // }
      console.log()
      getDown(folderRef, folderRef._location.path)
      console.log(folderRef)

    });
    res.items.forEach((itemRef) => {
      // All the items under listRef.
      // getDown(itemRef)
      console.log(itemRef)





      // .catch((error) => {
      //   // Handle any errors
      // });
      //   // // `url` is the download URL for your variable
      //     // document.getElementById("out").innerText = itemRef
    });
  }).catch((error) => {
    const err3 = error
    createToast('error')
    // Uh-oh, an error occurred!
  });

// report = document.createElement("script");

//     newContent = document.createTextNode(xhr.response);
//     newContent1 = document.createTextNode('var i = document.getElementById("out") i.innerText = player');

//       report.appendChild(newContent);
//       report.appendChild(newContent1);
// const currentDiv = document.getElementById("out");

// document.body.insertBefore(report, currentDiv);

function addElement(name1, reason, platform, path, uid12, fp, pID, imgSRC) {
  // create a new div element

  const photoURL = window.localStorage.getItem('photoURL')

  if (window.localStorage.getItem('perm') == '22344' || window.localStorage.getItem('perm') == '33211' || window.localStorage.getItem('perm') == null) {
    const bu = `
// <a href="#">View integration</a>
							<label class="toggle">
								<input type="checkbox" checked>
								<span></span>
							</label>
`

    const newP = "'" + path + "'"
    const newuid12 = "'" + uid12 + "'"
    const newPID = "'" + pID + "'"
    const newIMG = "'" + imgSRC + "'"
    const newElement = `
  					<article class="card" id="${path}">
						<div class="card-header">
							<div>
								<span><img src="${photoURL}" /></span>
								<h3>${name1}</h3>
							</div>

						</div>
						<div class="card-body">
							<p>${reason}</p>
						</div>
						<div class="card-footer">
				<p>${platform}</p>
       <button title="View attached evidence" onclick="openIMG(${newIMG})" class="btn">📦</button>
       <button title="Accept report and remove from dashboard" onclick="acceptReport(${newP}, ${newuid12}, ${newPID})" class="btn">🟢</button>
       <button title="Deny report and remove from dashboard" onclick="denyReport(${newP}, ${newuid12}, ${newPID})" class="btn">🔴</button>
						</div>
					</article>
  `


    // add the newly created element and its content into the DOM
    const currentDiv = document.getElementById("out");

    currentDiv.innerHTML += newElement
  } else {
    const bu = `
              <a href="#">View integration</a>
							<label class="toggle">
								<input type="checkbox" checked>
								<span></span>
							</label>
`

    const newP = "'" + path + "'"
    const newuid12 = "'" + uid12 + "'"
    const newPID = "'" + pID + "'"
    const newIMG = "'" + imgSRC + "'"
    const newElement = `
  					<article class="card" id="${path}">
						<div class="card-header">
							<div>
								<span><img src="${photoURL}" /></span>
								<h3>${name1}</h3>
							</div>

						</div>
						<div class="card-body">
							<p>${reason}</p>
						</div>
						<div class="card-footer">
							<p>${platform}</p>
       <script>

    </script>
              <button title="View attached evidence" onclick="openIMG(${newIMG})" class="btn">📦</button>
						</div>
					</article>
  `

    // add the newly created element and its content into the DOM
    const currentDiv = document.getElementById("out");

    currentDiv.innerHTML += newElement
  }
}

function getDown(from, path) {
  const i10 = from
  console.log(from)
  //   const result = from.substr(1, 4);

  getDownloadURL(ref(storage, from + '/name.txt'))
    .then((url) => {
      // // `url` is the download URL for your variable
      console.log(url)
      const xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onload = function() {
        if (xhr.status === 200) {
          console.log(xhr.responseText);

          var name12 = xhr.responseText

          if (name12 == null) {
            console.error('FILE = NULL')
          }
          var get = from + '/reason.txt'
          console.log(get)
          getDownloadURL(ref(storage, get))
            .then((url) => {
              // // `url` is the download URL for your variable

              const xhr = new XMLHttpRequest();

              xhr.open('GET', url);
              xhr.onload = function() {
                if (xhr.status === 200) {
                  console.log(xhr.responseText);

                  // window.sessionStorage.setItem("reason", xhr.responseText)
                  var reason12 = xhr.responseText
                  // addElement(name12, xhr.responseText, path)
                  var get = from + '/platform.txt'
                  console.log(get)
                  getDownloadURL(ref(storage, get))
                    .then((url) => {
                      // // `url` is the download URL for your variable

                      const xhr = new XMLHttpRequest();

                      xhr.open('GET', url);
                      xhr.onload = function() {
                        if (xhr.status === 200) {
                          console.log(xhr.responseText);

                          // window.sessionStorage.setItem("reason", xhr.responseText)
                          // addElement(name12, reason12, xhr.responseText, path)
                          const platform12 = xhr.responseText

                          var get = from + '/uid.txt'
                          console.log(get)
                          getDownloadURL(ref(storage, get))
                            .then((url) => {
                              // // `url` is the download URL for your variable

                              const xhr = new XMLHttpRequest();

                              xhr.open('GET', url);
                              xhr.onload = function() {
                                if (xhr.status === 200) {
                                  console.log(xhr.responseText);

                                  const uid12 = xhr.responseText
                                  // window.sessionStorage.setItem("reason", xhr.responseText)
                                  // addElement(name12, reason12, platform12, path, xhr.responseText, from)
                                  var get = from + '/id.txt'
                                  console.log(get)
                                  getDownloadURL(ref(storage, get))
                                    .then((url) => {
                                      // // `url` is the download URL for your variable

                                      const xhr = new XMLHttpRequest();

                                      xhr.open('GET', url);
                                      xhr.onload = function() {
                                        if (xhr.status === 200) {
                                          console.log(xhr.responseText);

                                          const id1231 = xhr.responseText
                                          
                                  var get = from + '/img.txt'
                                  getDownloadURL(ref(storage, get))
                                    .then((url) => {
                                      // // `url` is the download URL for your variable
                                  try {
                                      const xhr = new XMLHttpRequest();

                                      xhr.open('GET', url);
                                      xhr.onload = function() {
                                        if (xhr.status === 200) {
                                          console.log(xhr.responseText);


                                          // window.sessionStorage.setItem("reason", xhr.responseText)
                                          addElement(name12, reason12, platform12, path, uid12, from, id1231, xhr.responseText)



                                        } else {
                                          console.error(xhr.statusText);
                                          const err3 = error
                                          createToast('error')
                                          addElement(name12, reason12, platform12, path, uid12, from, id1231)
                                        }
                                      };
                                      xhr.onerror = function(error) {
                                        console.error(error);
                                        const err3 = error
                                        createToast('error')
                                        addElement(name12, reason12, platform12, path, uid12, from, id1231)
                                      };
                                      xhr.send();
                                      } catch (error) {
                                        addElement(name12, reason12, platform12, path, uid12, from, id1231)
                                      }
                                    }) //end
                              
                                          // window.sessionStorage.setItem("reason", xhr.responseText)

                                        } else {
                                          console.error(xhr.statusText);
                                          const err3 = error
                                          createToast('error')
                                        }
                                      };
                                      xhr.onerror = function(error) {
                                        console.error(error);
                                        const err3 = error
                                        createToast('error')
                                      };
                                      xhr.send();
                                    }) //end


                                } else {
                                  console.error(xhr.statusText);
                                  const err3 = error
                                  createToast('error')
                                }
                              };
                              xhr.onerror = function(error) {
                                console.error(error);
                                const err3 = error
                                createToast('error')
                              };
                              xhr.send();
                            }) //end

                        } else {
                          console.error(xhr.statusText);
                          const err3 = error
                          createToast('error')
                        }
                      };
                      xhr.onerror = function(error) {
                        console.error(error);
                        const err3 = error
                        createToast('error')
                      };
                      xhr.send();
                    }) //end


                } else {
                  console.error(xhr.statusText);
                  const err3 = error
                  createToast('error')
                }
              };
              xhr.onerror = function(error) {
                console.error(error);
                const err3 = error
                createToast('error')
              };
              xhr.send();
            }) //end

        } else {
          console.error(xhr.statusText);
        }
      };
      xhr.onerror = function(error) {
        console.error(error);
        const err3 = error
        createToast('error')
      };
      xhr.send();
    }) //end
}

function updatemenu() {
  if (document.getElementById('responsive-menu').checked == true) {
    document.getElementById('menu').style.borderBottomRightRadius = '0';
    document.getElementById('menu').style.borderBottomLeftRadius = '0';
  } else {
    document.getElementById('menu').style.borderRadius = '10px';
  }
}



function del(path1) {
  document.getElementById(path1).remove()
}

const notifications = document.querySelector(".notifications")
// buttons = document.querySelectorAll(".buttons .btn");
// Object containing details for different types of toasts
const toastDetails = {
  timer: 5000,
  success: {
    icon: 'fa-circle-check',
    text: 'Success: Answered Report',
  },
  error: {
    icon: 'fa-circle-xmark',
    text: 'There Was An Error',
  },
  warning: {
    icon: 'fa-triangle-exclamation',
    text: 'Warning: This is a warning toast.',
  },
  alreadyAccount: {
    icon: 'fa-solid fa-bomb',
    text: 'There is already an account with this id. <a href="//report.zymono.com/zymono>Not Right?</a>',
  },
  info: {
    icon: 'fa-circle-info',
    text: 'Welcome Back, ' + window.localStorage.getItem("displayName") + '!',
  }
}
const removeToast = (toast) => {
  toast.classList.add("hide");
  if (toast.timeoutId) clearTimeout(toast.timeoutId); // Clearing the timeout for the toast
  setTimeout(() => toast.remove(), 500); // Removing the toast after 500ms
}
const createToast = (id) => {
  // Getting the icon and text for the toast based on the id passed
  const { icon, text } = toastDetails[id];
  const toast = document.createElement("li"); // Creating a new 'li' element for the toast
  toast.className = `toast ${id}`; // Setting the classes for the toast
  // Setting the inner HTML for the toast
  toast.innerHTML = `<div class="column">
                         <i class="fa-solid ${icon}"></i>
                         <span>${text}</span>
                      </div>
                      <i class="fa-solid fa-xmark" onclick="removeToast(this.parentElement)"></i>`;
  notifications.appendChild(toast); // Append the toast to the notification ul
  // Setting a timeout to remove the toast after the specified duration
  toast.timeoutId = setTimeout(() => removeToast(toast), toastDetails.timer);
}
// Adding a click event listener to each button to create a toast when clicked
// buttons.forEach(btn => {
//     btn.addEventListener("click", () => createToast(btn.id));
// });


window.addEventListener("load", (event) => {
  if (window.sessionStorage.getItem('wb') == null) {
    createToast('info')
    window.sessionStorage.setItem('wb', 'true')
  }

});

function reportFile(path, value) {
  var sr = "zymono/report/" + value

  const storage = getStorage();
  const storageRef = ref(storage, sr);

  uploadString(storageRef, path + '.zy').then((snapshot) => {
    console.log('Uploaded raw string');

  })
}

window.saveCloud = saveCloud;
window.createToast = createToast;

if (window.localStorage.getItem('ZYVERIFY')) {
  const veriRef = ref(storage, `zymono/user/${window.localStorage.getItem('buid')}/`)
    
  listAll(veriRef)
  .then((res) => {
    res.prefixes.forEach((folderRef) => {
      //FOLDER
    });
    res.items.forEach((itemRef) => {
      //ITEM
      if (itemRef.name == 'team') {
        window.sessionStorage.setItem('noTeam', 'true')
      }
      if (itemRef.name == 'perm') {
        window.sessionStorage.setItem('noPerm', 'true')
      }
      if (itemRef.name == 'silver') {
        window.sessionStorage.setItem('noSilv', 'true')
      }
      
    });
  }).catch((error) => {
    const err3 = error
    createToast('error')
    
  });
setTimeout(function() {
  if (window.sessionStorage.getItem('noTeam')) {} else {
    saveCloud(`user/${window.localStorage.getItem('buid')}/team`, window.localStorage.getItem('uid'))
    console.log('noTeam')
  }
  if (window.sessionStorage.getItem('noPerm')) {} else {
    saveCloud(`user/${window.localStorage.getItem('buid')}/perm`, '22344')
    console.log('noPerm')
  }
  if (window.sessionStorage.getItem('noSilv')) {} else {
    saveCloud(`user/${window.localStorage.getItem('buid')}/silver`, 'f')
    console.log('noSilv')
  }
}, 1000); // delay of 100 milliseconds or 0.1 seconds

  
  window.localStorage.removeItem('ZYVERIFY')
}

//EDITURL POPUP

// Get the editURL element
const editURL = document.querySelector('#editURL');

// Get the popup container
const popup = document.querySelector('#popup-form');

// Add a click event listener to the editURL element
editURL.addEventListener('click', () => {
  // Show the popup container
  popup.style.display = 'block';
});

// Function to close the popup
function closePopup() {
  // Hide the popup container
  popup.style.display = 'none';
}

// function _0x4ee9() { var _0x43d024 = ['1745343uSOhqH', '#desc', 'querySelector', '124715YkYjnc', '6228584bePIVn', '259098jPJKax', '11331481KnqPtz', 'getItem', '6KOUGtP', '824729XBYWLK', '51eaWbpY', 'value', 'localStorage', '176804JFqqli']; _0x4ee9 = function() { return _0x43d024; }; return _0x4ee9(); } var _0xebc461 = _0x40e5; function _0x40e5(_0x3722aa, _0x3641df) { var _0x4ee925 = _0x4ee9(); return _0x40e5 = function(_0x40e589, _0x5190bf) { _0x40e589 = _0x40e589 - 0x183; var _0x7af6c5 = _0x4ee925[_0x40e589]; return _0x7af6c5; }, _0x40e5(_0x3722aa, _0x3641df); } (function(_0x1b603b, _0x249698) { var _0x46b27c = _0x40e5, _0x4aae25 = _0x1b603b(); while (!![]) { try { var _0x53c969 = parseInt(_0x46b27c(0x183)) / 0x1 + parseInt(_0x46b27c(0x18d)) / 0x2 + -parseInt(_0x46b27c(0x184)) / 0x3 * (parseInt(_0x46b27c(0x187)) / 0x4) + parseInt(_0x46b27c(0x18b)) / 0x5 + parseInt(_0x46b27c(0x190)) / 0x6 * (parseInt(_0x46b27c(0x18e)) / 0x7) + -parseInt(_0x46b27c(0x18c)) / 0x8 + -parseInt(_0x46b27c(0x188)) / 0x9; if (_0x53c969 === _0x249698) break; else _0x4aae25['push'](_0x4aae25['shift']()); } catch (_0x57dc9d) { _0x4aae25['push'](_0x4aae25['shift']()); } } }(_0x4ee9, 0xd5667)); window[_0xebc461(0x186)][_0xebc461(0x18f)]('+') && (document['querySelector'](_0xebc461(0x189))[_0xebc461(0x185)] = '', document[_0xebc461(0x18a)](_0xebc461(0x189))['disabled'] = ![]);
// if (window.localStorage.getItem('+')) {
//   document.querySelector('#desc').value = ''
//   document.querySelector('#desc').disabled = false
// }

if (window.localStorage.getItem('+')) {
  document.querySelector('#desc').value = ''
  document.querySelector('#desc').disabled = false
  document.querySelector('#description').value = ''
  document.querySelector('#description').disabled = false
  document.querySelector('#banner').value = ''
  document.querySelector('#banner').disabled = false
}

function checkIfValid() {
  listAll(listRef)
    .then((res) => {
      res.prefixes.forEach((folderRef) => {

        if (window.btoa(window.btoa(document.querySelector('#desc').value)) == folderRef.name) {
          alert(createToast('error'))
        }

      });
      res.items.forEach((itemRef) => {

      });
    }).catch((error) => {
      const err3 = error
      createToast('error')
      // Uh-oh, an error occurred!
    });
}

const popup1 = document.querySelector('#imagePreview');

// Add a click event listener to the editURL element
// editURL1.addEventListener('click', () => {
//   // Show the popup container
//   popup1.style.display = 'block';
// });
          function openIMG(srcURL) {
            popup1.style.display = 'block'
            document.getElementById('imgPre').src = srcURL
          }

console.log(openIMG)

// document.querySelector('#imagePreview').style.display = 'block'; document.getElementById('imgPre').src = srcURL;

// document.getElementById('policy').addEventListener('click', updatePolicy)

// function updatePolicy() {
//   const policy = window.prompt('Please enter a policy URL (include https://)', 'E.g. https://zymono.com/policy/terms.html')

//   saveCloud(`${window.localStorage.getItem('uid')}/policy.txt`, policy)
// }