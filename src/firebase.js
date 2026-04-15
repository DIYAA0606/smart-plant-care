import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDU2Qqj8P26xgnEcciXNxtSvpMPQvZwM8c",
  authDomain: "smart-irrigation-system1234.firebaseapp.com",
  databaseURL: "https://smart-irrigation-system1234-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "smart-irrigation-system1234",
  storageBucket: "smart-irrigation-system1234.firebasestorage.app",
  messagingSenderId: "584694035272",
  appId: "1:584694035272:web:bc63a4b04d38b0262ef97d"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, onValue, set };