// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdRSAN2bN3mpVnguAziZP4_Tuw0lqgEGw",
  authDomain: "ecommerce-galvan.firebaseapp.com",
  projectId: "ecommerce-galvan",
  storageBucket: "ecommerce-galvan.appspot.com",
  messagingSenderId: "910861207843",
  appId: "1:910861207843:web:aecfa774b3141e9ec32496"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// obtener la authenticacion ---> app