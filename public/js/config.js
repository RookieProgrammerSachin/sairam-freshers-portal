import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js';

const firebaseConfig = {
    apiKey: "AIzaSyCTl3BDu7zVmy9QLqMDao31c6ZVOCeghM4",
    authDomain: "sairam-freshers.firebaseapp.com",
    projectId: "sairam-freshers",
    storageBucket: "sairam-freshers.appspot.com",
    messagingSenderId: "60215698703",
    appId: "1:60215698703:web:f33b8689373865bf5b8a7a"
};
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export { auth, signInWithEmailAndPassword, onAuthStateChanged, signOut }