import firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/storage';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAC38Y-Tjm0yHZ9MY0lwvHTqcEmRTwy8Rs",
    authDomain: "fb-crud-react-c2bc7.firebaseapp.com",
    projectId: "fb-crud-react-c2bc7",
    storageBucket: "fb-crud-react-c2bc7.appspot.com",
    messagingSenderId: "373273205542",
    appId: "1:373273205542:web:8cedadf7ec50fb488effe7"
  };
  // Initialize Firebase
  const database = firebase.initializeApp(firebaseConfig);

  export const db = database.storage(), data = database.firestore();
