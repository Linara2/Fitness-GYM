// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { ReactNativeAsyncStorage } from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZ4NK8omKXblAba_Sunn4Qs9hWVx5Ra9E",
  authDomain: "gym-project-bb7f7.firebaseapp.com",
  projectId: "gym-project-bb7f7",
  storageBucket: "gym-project-bb7f7.firebasestorage.app",
  messagingSenderId: "375269060543",
  appId: "1:375269060543:web:0d07574e6acca73db5bb0a",
  measurementId: "G-F6086XR3PG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
})

export const db = getFirestore(app)
const analytics = getAnalytics(app);


