// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-estate-7aa8a.firebaseapp.com",
    projectId: "mern-estate-7aa8a",
    storageBucket: "mern-estate-7aa8a.appspot.com",
    messagingSenderId: "65955390275",
    appId: "1:65955390275:web:9ad6e98fd61c26102785f6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

