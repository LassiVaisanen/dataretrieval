// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getFirestore, collection, addDoc, query, onSnapshot, serverTimestamp, orderBy} from "firebase/firestore"

//import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};


// Initialize Firebase

initializeApp(firebaseConfig);

//const analytics = getAnalytics(app);

const firestore = getFirestore()

const MESSAGES = 'messages'

export {
    firestore, collection, addDoc, MESSAGES, query, onSnapshot, serverTimestamp, orderBy
};