// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import AsyncStorage from '@react-native-async-storage/async-storage';

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
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
