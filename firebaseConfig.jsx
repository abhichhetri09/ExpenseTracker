import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAFflyw3KrTJFRlWxomXm7ZeoT-FaUNKcU",
    authDomain: "expenseapp-7a09b.firebaseapp.com",
    projectId: "expenseapp-7a09b",
    storageBucket: "expenseapp-7a09b.appspot.com",
    messagingSenderId: "439307685304",
    appId: "1:439307685304:web:c9c2dd5971194025fb934d",
    measurementId: "G-B78B5S6C3M"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export { auth };