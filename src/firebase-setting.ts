// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAU7yPNxBMGTQsy4tO1eH2rcCZM_488wYE",
  authDomain: "therealworld-6861c.firebaseapp.com",
  projectId: "therealworld-6861c",
  storageBucket: "therealworld-6861c.firebasestorage.app",
  messagingSenderId: "293283707069",
  appId: "1:293283707069:web:65ec0a39058ecd177e9fd4",
  measurementId: "G-SRM3JQTK0B",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
