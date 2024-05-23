// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth"; //sets up auth functonality
// TODO: Add SDKs for Firebase products that you want to use - Authentication, Firesotre & Storage 
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDaX-NbZSpEEhbdbMcfjipXamT9SXKt0ko",
    authDomain: "enchantedreviews-61686.firebaseapp.com",
    projectId: "enchantedreviews-61686",
    storageBucket: "enchantedreviews-61686.appspot.com",
    messagingSenderId: "980378383687",
    appId: "1:980378383687:web:8dcc7f2f98cb3be2008862"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // Exporting our auth capibilities