// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection } from "firebase/firestore";
 
const firebaseConfig = {
  apiKey: "AIzaSyDKVRKyQvO41TaK8XH5Pv_I02amwH__76g",
  authDomain: "devchat-6e862.firebaseapp.com",
  projectId: "devchat-6e862",
  storageBucket: "devchat-6e862.firebasestorage.app",
  messagingSenderId: "846253858122",
  appId: "1:846253858122:web:941ebcf0aef9dc10acb5b3",
  measurementId: "G-J28N64E8LP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 

export const auth = initializeAuth(app);
export const db = getFirestore(app);

export const usersRef = collection(db, "users");
export const chatRoomsRef = collection(db, "chatRooms");