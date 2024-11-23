import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBBmyirUScyWqobNKyKvpbbKEUVSEcEUE4",
    authDomain: "vanilla-app-unisales.firebaseapp.com",
    projectId: "vanilla-app-unisales",
    storageBucket: "vanilla-app-unisales.firebasestorage.app",
    messagingSenderId: "398090863209",
    appId: "1:398090863209:web:105e3df9f120faa82f98f8",
    measurementId: "G-L6RFBYH1R6",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

