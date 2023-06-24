import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBKjt1_vByNhUjT0tveQjuRoz5PBUunfiE",
  authDomain: "react-ai-extension.firebaseapp.com",
  projectId: "react-ai-extension",
  storageBucket: "react-ai-extension.appspot.com",
  messagingSenderId: "510458035258",
  appId: "1:510458035258:web:d96a42b1446a39981b4903",
  measurementId: "G-8XV8EBPVBT"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app,"https://react-ai-extension-default-rtdb.asia-southeast1.firebasedatabase.app/")
export const firestoreDB = getFirestore(app)
export const auth = getAuth(app) 