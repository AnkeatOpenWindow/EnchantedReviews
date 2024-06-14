import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db, storage } from '../../firebase';
import { signOut } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const handleLogin = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      AsyncStorage.setItem('user', JSON.stringify(user)); // Store user info in AsyncStorage
      return { success: true, user };
    })
    .catch((error) => {
      const errorMessage = error.message;
      return { success: false, error: errorMessage };
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
