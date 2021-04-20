

import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBoLkHaBUP7aHZNcotwVUWAnR7Bozn5y2k",
    authDomain: "todo-app-fa9cf.firebaseapp.com",
    projectId: "todo-app-fa9cf",
    storageBucket: "todo-app-fa9cf.appspot.com",
    messagingSenderId: "1068196663755",
    appId: "1:1068196663755:web:ff7073ee086777b5bb264e",
    measurementId: "G-ZRJEP68KCR"
  });

const db  = firebaseApp.firestore();
const auth = firebase.auth();
const googleAuth = new firebase.auth.GoogleAuthProvider();

export { auth, googleAuth};
export default db;