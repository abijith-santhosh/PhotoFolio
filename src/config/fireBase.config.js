// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAiCEPKevEsIDcQPSrGgWhrmcF7sQYmWsI",
  authDomain: "photofolio-e07ad.firebaseapp.com",
  projectId: "photofolio-e07ad",
  storageBucket: "photofolio-e07ad.appspot.com",
  messagingSenderId: "650039683764",
  appId: "1:650039683764:web:e318c588453102735005e1"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};