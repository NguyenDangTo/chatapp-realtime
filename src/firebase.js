// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getAnalytics} from "firebase/analytics";
import {getStorage} from "firebase/storage";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDl4SqHzcPgYAikS9U2mHn_JLcDOjVh5Cc",
  authDomain: "chatapp-realtime-8a242.firebaseapp.com",
  projectId: "chatapp-realtime-8a242",
  storageBucket: "chatapp-realtime-8a242.appspot.com",
  messagingSenderId: "308830392176",
  appId: "1:308830392176:web:3ced8fd268ffcdca4e49b5",
  measurementId: "G-FEMJVYSXN7",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const storage = getStorage();
export const db = getFirestore(app);
