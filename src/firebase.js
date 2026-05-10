// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
  update,
} from "firebase/database";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8C0n7usMWLSKrbMsyjZ9EF6XmS9rzUPs",
  authDomain: "shopping-tracker-c8f46.firebaseapp.com",
  databaseURL: "https://shopping-tracker-c8f46-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "shopping-tracker-c8f46",
  storageBucket: "shopping-tracker-c8f46.firebasestorage.app",
  messagingSenderId: "867404595698",
  appId: "1:867404595698:web:69e6f18558effa9c61ab6b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export {
  ref,
  push,
  onValue,
  remove,
  update,
};