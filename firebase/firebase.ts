import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBnF0Dx7V4KAVWhrda8IVHnx7GLHZ0Y5go",
  authDomain: "summarist-4ee1d.firebaseapp.com",
  projectId: "summarist-4ee1d",
  storageBucket: "summarist-4ee1d.firebasestorage.app",
  messagingSenderId: "574529797652",
  appId: "1:574529797652:web:f1a8c895a022adbf793101"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app)
export default app;