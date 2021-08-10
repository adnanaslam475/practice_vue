import firebase from 'firebase'
var firebaseConfig = {
    apiKey: "AIzaSyBxqH55VMdnAOPyt62gEM6w2oH84Nk2Qrc",
    authDomain: "vuepractice-7ee82.firebaseapp.com",
    databaseURL: "https://vuepractice-7ee82-default-rtdb.firebaseio.com",
    projectId: "vuepractice-7ee82",
    storageBucket: "vuepractice-7ee82.appspot.com",
    messagingSenderId: "538423555153",
    appId: "1:538423555153:web:db5235aa601dd2cbd57470",
    measurementId: "G-LFR5SEN6H9"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//   firebase.database
  firebase.analytics();