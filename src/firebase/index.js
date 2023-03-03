import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Replaced this with our Firebase SDK config snippet
const firebaseConfig = {
    apiKey: "AIzaSyBuUphz4PYFXV9NiTfbd-F4PnAiMOPMJuU",
    authDomain: "momz-example.firebaseapp.com",
    projectId: "momz-example",
    storageBucket: "momz-example.appspot.com",
    messagingSenderId: "67161364177",
    appId: "1:67161364177:web:7646898be6964e031f17f0",
    measurementId: "G-Y9Z0DN2HPQ"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { auth };