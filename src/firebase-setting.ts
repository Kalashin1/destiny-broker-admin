// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8qQhVVpwkCp8l_9NFM6nocEaARXD5Dho",
  authDomain: "iamkala-c8f64.firebaseapp.com",
  databaseURL: "https://iamkala-c8f64.firebaseio.com",
  projectId: "iamkala-c8f64",
  storageBucket: "iamkala-c8f64.firebasestorage.app",
  messagingSenderId: "443588726058",
  appId: "1:443588726058:web:52b9a8f1a368a06dad6253",
  measurementId: "G-P20HZ9R8RC",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
