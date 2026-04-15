import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDU2Qqj8P26xgnEcciXNxtSvpMPQvZwM8c",
  authDomain: "smart-irrigation-system1234.firebaseapp.com",
  databaseURL:
    "https://smart-irrigation-system1234-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "smart-irrigation-system1234",
  storageBucket: "smart-irrigation-system1234.firebasestorage.app",
  messagingSenderId: "584694035272",
  appId: "1:584694035272:web:bc63a4b04d38b0262ef97d",
};

// ✅ FIRST initialize app
const app = initializeApp(firebaseConfig);

// ✅ THEN use app everywhere
export const db = getDatabase(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();