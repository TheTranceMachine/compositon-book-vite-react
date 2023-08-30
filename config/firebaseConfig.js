import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_authDomain,
  projectId: import.meta.env.VITE_FIREBASE_projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_storageBucket,
  messagingSenderId: import.meta.env.VITE_FIREBASE_messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_appId,
  measurementId: import.meta.env.VITE_FIREBASE_measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage();
export const db = getFirestore(app);
