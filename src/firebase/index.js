import { initializeApp, getApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBjin7Nugwmd7J2fC3GItNWmXB25zkubbM",
  authDomain: "turbosale-ff8a3.firebaseapp.com",
  projectId: "turbosale-ff8a3",
  storageBucket: "turbosale-ff8a3.appspot.com",
  messagingSenderId: "118859126726",
  appId: "1:118859126726:web:33eb938c18b44b5290c4c7",
  measurementId: "G-GTLDRCD5PZ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider, storage };