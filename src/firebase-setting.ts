// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCr0m2epn7wRGZMRl4D5BpemRGJCQGCN8Q",
  authDomain: "capital-trade-1e7d5.firebaseapp.com",
  projectId: "capital-trade-1e7d5",
  storageBucket: "capital-trade-1e7d5.firebasestorage.app",
  messagingSenderId: "882823658121",
  appId: "1:882823658121:web:9c525317f218cebeda2458",
  measurementId: "G-SQ0Q4WK8NB"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
