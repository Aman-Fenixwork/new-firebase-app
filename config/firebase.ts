import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig"
import {
  getAuth,
} from "firebase/auth";
import {
  getFirestore,
  Firestore
} from "firebase/firestore";
import { getStorage, ref } from "firebase/storage"
// import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";s

const firebaseapp = initializeApp(firebaseConfig);

export const auth = getAuth();

export default firebaseapp

export const db:Firestore = getFirestore();

export const storage = getStorage();

export const storageRef = ref(storage);

export const imagesRef = ref(storage, 'images/');

// initializeAppCheck(firebaseapp, {
//   provider: new ReCaptchaV3Provider('933AC412-A36F-4428-9CD2-7EDD757048FF'),
//   isTokenAutoRefreshEnabled: true
// });