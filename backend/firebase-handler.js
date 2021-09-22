import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBsZa-i5e2CsECSi5UowMmjekUu6umYcY",
  authDomain: "thenewzkit.firebaseapp.com",
  databaseURL: "https://thenewzkit-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "thenewzkit",
  storageBucket: "thenewzkit.appspot.com",
  messagingSenderId: "356670772644",
  appId: "1:356670772644:web:8aad217dd4f7c1e9079d31",
  measurementId: "G-NFSNDR9MT2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseDatabase = getDatabase(app);
export const firebaseStorage = getStorage(app);
