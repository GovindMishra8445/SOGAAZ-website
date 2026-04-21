import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBwSBzJMwZOlgkfb3g1ljet2X6lWO7vYkM",
  authDomain: "sogaaz-918ca.firebaseapp.com",
  projectId: "sogaaz-918ca",
  storageBucket: "sogaaz-918ca.firebasestorage.app",
  messagingSenderId: "630414586905",
  appId: "1:630414586905:web:18b0d7ea6f431463522688",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
