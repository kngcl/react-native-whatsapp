import { getAuth } from 'firebase/auth';
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore' 
import { getStorage } from 'firebase/storage';
import { initializeApp } from "firebase/app";
import { getFirestore, initializeFirestore } from "firebase/firestore";

export const firebaseConfig = {

  apiKey: "AIzaSyDI0QVKSgyUfsACBX1tf1dD9Htswd7J4cE",
  authDomain: "whatsapp-react-native-cl-830e8.firebaseapp.com",
  projectId: "whatsapp-react-native-cl-830e8",
  storageBucket: "whatsapp-react-native-cl-830e8.appspot.com",
  messagingSenderId: "908174823657",
  appId: "1:908174823657:web:ef6937be37599c5c392078",
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});



