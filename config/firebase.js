import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
/*   apiKey: process.env.EXPO_PUBLIC_APIKEY,
  authDomain: process.env.EXPO_PUBLIC_AUTHDOMAIN,
  projectId: process.env.EXPO_PUBLIC_PROJECTID,
  storageBucket: process.env.EXPO_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_MESSAGINGSENDER,
  appId: process.env.EXPO_PUBLIC_APPID, */
    apiKey: "AIzaSyDI0QVKSgyUfsACBX1tf1dD9Htswd7J4cE",
  authDomain: "whatsapp-react-native-cl-830e8.firebaseapp.com",
  projectId: "whatsapp-react-native-cl-830e8",
  storageBucket: "whatsapp-react-native-cl-830e8.appspot.com",
  messagingSenderId: "908174823657",
  appId: "1:908174823657:web:ef6937be37599c5c392078",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const db = getFirestore(app, {
  experimentalForceLongPolling: true,
});

export function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function signUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}