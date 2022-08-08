import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig"
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithCustomToken
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  DocumentData,
  DocumentReference,
  Firestore
} from "firebase/firestore";


const firebaseapp = initializeApp(firebaseConfig);

export const auth = getAuth();

export default firebaseapp


export const db:Firestore = getFirestore();