// firebase.js
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKVhe9KaK7niBwHYuYMQ5Us5vkrPfNsdc",
  authDomain: "crud-app-36338.firebaseapp.com",
  projectId: "crud-app-36338",
  storageBucket: "crud-app-36338.appspot.com",
  messagingSenderId: "220906354004",
  appId: "1:220906354004:web:902ed33448aef89c9284c1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db, collection, addDoc, getDocs, updateDoc, deleteDoc, doc };
