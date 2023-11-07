// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_NlOkYRE1BrCjLzU3qKcfYll92QVuoik",
  authDomain: "tepi2bim.firebaseapp.com",
  projectId: "tepi2bim",
  storageBucket: "tepi2bim.appspot.com",
  messagingSenderId: "760926777996",
  appId: "1:760926777996:web:d03a2039836b9a023901a9"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
