import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db, storage } from '../../firebase';
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage"; // Import necessary storage functions
import AsyncStorage from '@react-native-async-storage/async-storage';

export const handleLogin = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Logged In User: " + user.email);
      AsyncStorage.setItem('user', JSON.stringify(user)); // Store user info in AsyncStorage
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
    });
}

export const handleRegistration = (email, password, username) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      console.log("Registered User: " + user.email);
      await setDoc(doc(db, "users", user.uid), {
        email: email,
        username: username,
      });
      AsyncStorage.setItem('user', JSON.stringify(user)); // Store user info in AsyncStorage
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.error(errorMessage);
    });
}

export const handleLogout = () => {
  return signOut(auth)
    .then(() => {
      console.log('User signed out successfully');
      AsyncStorage.removeItem('user'); // Clear user info from AsyncStorage
    })
    .catch((error) => {
      console.error('Error signing out: ', error);
    });
}
