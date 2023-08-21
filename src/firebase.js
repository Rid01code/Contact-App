import firebase from "firebase/compat/app";

import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyBj3-itHN2-v4zRieg1WwNQN6e9rPbDSiY",
  authDomain: "react-crud-app-4d4ca.firebaseapp.com",
  projectId: "react-crud-app-4d4ca",
  storageBucket: "react-crud-app-4d4ca.appspot.com",
  messagingSenderId: "64334157681",
  appId: "1:64334157681:web:e6fa48e645e0a88d6248d0"
};


const fireDb = firebase.initializeApp(firebaseConfig);
export default fireDb.database().ref();