import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase';

export const handleLogin = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Logged In User- " + user.email);
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
    });
}

export const handleRegistration = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Registered User: " + user.email);
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.error(errorMessage);
    });
};
