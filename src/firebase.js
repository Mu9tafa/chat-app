import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
   apiKey: "AIzaSyBj8P2FmsecduKbM7YyFQCDpFV6HQ-tcg0",
   authDomain: "chat-app-224.firebaseapp.com",
   projectId: "chat-app-224",
   storageBucket: "chat-app-224.appspot.com",
   messagingSenderId: "1084294037042",
   appId: "1:1084294037042:web:c41a2d6fe13be036dfc62b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// init services
const db = getFirestore();

// init colRef
const colRef = collection(db, "messages");

const auth = getAuth(app);

export { db, auth, colRef };
