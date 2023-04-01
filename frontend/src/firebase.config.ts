import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDp9quO5nwDTQ8W32mEttNE2DSvSkmSW2Q",
  authDomain: "orthodox-41859.firebaseapp.com",
  projectId: "orthodox-41859",
  storageBucket: "orthodox-41859.appspot.com",
  messagingSenderId: "474759663742",
  appId: "1:474759663742:web:e8acdff8c4218c5f77c82f",
  measurementId: "G-1XEYSJPBY5"
};

const app = initializeApp(firebaseConfig);


export const auth = getAuth(app) 