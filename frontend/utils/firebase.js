// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, GoogleAuthProvider} from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "loginvirtualcourses-d8c42.firebaseapp.com",
  projectId: "loginvirtualcourses-d8c42",
  storageBucket: "loginvirtualcourses-d8c42.firebasestorage.app",
  messagingSenderId: "850466598173",
  appId: "1:850466598173:web:0f7a46c7dc6300913ec5f4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth, provider}