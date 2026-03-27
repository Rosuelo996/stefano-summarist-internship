// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnF0Dx7V4KAVWhrda8IVHnx7GLHZ0Y5go",
  authDomain: "summarist-4ee1d.firebaseapp.com",
  projectId: "summarist-4ee1d",
  storageBucket: "summarist-4ee1d.firebasestorage.app",
  messagingSenderId: "574529797652",
  appId: "1:574529797652:web:f1a8c895a022adbf793101"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)