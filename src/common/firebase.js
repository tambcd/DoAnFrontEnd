import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
//import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCd98uFb6WUT0hmjtihoYiYmfwEibl22xg",
  authDomain: "doantotnghiep-255fc.firebaseapp.com",
  projectId: "doantotnghiep-255fc",
  storageBucket: "doantotnghiep-255fc.appspot.com",
  messagingSenderId: "850258614640",
  appId: "1:850258614640:web:dd5273736c0360318657b5",
  measurementId: "G-S4FPJKEGC9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
//const storage = getStorage(app);

export default (app,db)