// import* as firebase from 'firebase'
import firebase from 'firebase/app';
import 'firebase/firestore';

const settings = {timestampInSnapshots: true}

var firebaseConfig = {
    apiKey: "AIzaSyC9V7vdQgfpMeHPe7Y-lxpL9X62itJKEAc",
    authDomain: "crud-def22.firebaseapp.com",
    databaseURL: "https://crud-def22.firebaseio.com",
    projectId: "crud-def22",
    storageBucket: "crud-def22.appspot.com",
    messagingSenderId: "471021373854",
    appId: "1:471021373854:web:addb7ab1ead1d5379bae8f"
  };
  firebase.initializeApp(firebaseConfig);
  firebase.firestore().settings(settings);

  export default firebase;
  // Initialize Firebase