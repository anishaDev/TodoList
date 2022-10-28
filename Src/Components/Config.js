// import { initializeApp } from 'firebase/app';
// import { getFirestore } from "firebase/firestore";
import firebase  from 'firebase/compat/app';
import 'firebase/compat/auth';
import   'firebase/compat/firestore';
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyCljJMJJHvdhr4nxPEbd6LeGaLa9RPUNmI",
    authDomain: "reactnativefirebase-9bac9.firebaseapp.com",
    projectId: "reactnativefirebase-9bac9",
    storageBucket: "reactnativefirebase-9bac9.appspot.com",
    messagingSenderId: "423620080725",
    appId: "1:423620080725:web:b153d90fb867906a2210dc",
    measurementId: "G-9GKFVHMBXV"
  };

//  export const app = initializeApp(firebaseConfig);
//  //firestore reference
//  export const db = getFirestore(app);
if (!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}
export { firebase };