import { initializeApp } from "firebase/app";

import {
  getFirestore,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB8C0n7usMWLSKrbMsyjZ9EF6XmS9rzUPs",
  authDomain: "shopping-tracker-c8f46.firebaseapp.com",
  projectId: "shopping-tracker-c8f46",
  storageBucket: "shopping-tracker-c8f46.firebasestorage.app",
  messagingSenderId: "867404595698",
  appId: "1:867404595698:web:69e6f18558effa9c61ab6b",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);