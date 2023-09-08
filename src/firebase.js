import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAX23fETUqsO3qrMAPa5n6QOI0DluH9mUk",
  authDomain: "idea-voting-9389c.firebaseapp.com",
  projectId: "idea-voting-9389c",
  storageBucket: "idea-voting-9389c.appspot.com",
  messagingSenderId: "889077547787",
  appId: "1:889077547787:web:68386426da6e3640ea180e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);// Import the functions you need from the SDKs you need
const auth = getAuth(app);
export {auth};