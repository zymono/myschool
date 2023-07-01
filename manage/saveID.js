 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";

// import { checkAccount, checkPerms } from '/backend/account.js'
// checkAccount()

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

const storage = getStorage();

function saveCloud1(where, what) {
      var sr = "zymono/" + where
  
  const storage = getStorage();
const storageRef = ref(storage, sr);

uploadString(storageRef, what).then((snapshot) => {
  console.log('Uploaded raw string');
  
  })
}

// var dsub = document.getElementById("descSave").addEventListener("click", saveDesc)

function saveDesc() {
  var desc = document.getElementById("desc").value
window.localStorage.setItem('uid', window.btoa(window.btoa(desc)))
  saveCloud1(`user/${window.localStorage.getItem('buid')}/team`, window.btoa(window.btoa(desc)))
  }

// if (window.localStorage.getItem('+')) {
//   document.querySelector('#desc').value = ''
//   document.querySelector('#desc').disabled = false
// }