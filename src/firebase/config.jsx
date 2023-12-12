// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3Cfb_XRrBwVkLbY7QrCo-MWp2bwtTlNQ",
  authDomain: "miniblog-8921b.firebaseapp.com",
  projectId: "miniblog-8921b",
  storageBucket: "miniblog-8921b.appspot.com",
  messagingSenderId: "647772462640",
  appId: "1:647772462640:web:e45e4d08871789a60397f5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
