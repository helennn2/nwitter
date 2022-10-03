import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyCknDRlkRdF4kC8ONvvkQY07TL_fz-Wg-w",
    authDomain: "nwitter-371fa.firebaseapp.com",
    projectId: "nwitter-371fa",
    storageBucket: "nwitter-371fa.appspot.com",
    messagingSenderId: "527609025061",
    appId: "1:527609025061:web:0321131020b1d88021a5cc"
  };

firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;

export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const storageService = firebase.storage();