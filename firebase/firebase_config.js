// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyDPUinqM2anm9lp7WXE5-dAyE2g1sQy9jY",

  authDomain: "learncollective-743e8.firebaseapp.com",

  projectId: "learncollective-743e8",

  storageBucket: "learncollective-743e8.appspot.com",

  messagingSenderId: "117337969513",

  appId: "1:117337969513:web:8983138aac3110ef42a3f8",

  measurementId: "G-7DNJ0TTHVZ"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
export const auth = getAuth(app);

