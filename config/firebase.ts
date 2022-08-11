import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig"
import {
  getAuth,
} from "firebase/auth";
import {
  getFirestore,
  Firestore
} from "firebase/firestore";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

const firebaseapp = initializeApp(firebaseConfig);

export const auth = getAuth();

export default firebaseapp

export const db:Firestore = getFirestore();

export const appCheck = initializeAppCheck(firebaseapp, {
  provider: new ReCaptchaV3Provider('abcdefghijklmnopqrstuvwxy-1234567890abcd'),

  isTokenAutoRefreshEnabled: true
});