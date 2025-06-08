import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import {
  doc,
  getFirestore,
  setDoc,
  getDoc,
  addDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDkSnEuBWzBXHYxPcsl8TWKUNAsda8CGOY",
  authDomain: "practice-login-signup-285cf.firebaseapp.com",
  projectId: "practice-login-signup-285cf",
  storageBucket: "practice-login-signup-285cf.firebasestorage.app",
  messagingSenderId: "176265300171",
  appId: "1:176265300171:web:7f2174ddf90183928db34e",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

export {
  app,
  auth,
  setDoc,
  doc,
  db,
  getDoc,
  addDoc,
  collection,
  query,
  where,
  getDocs,
  onAuthStateChanged,
  signOut
};
