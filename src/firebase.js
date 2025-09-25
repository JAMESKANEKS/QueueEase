import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBVWa2OIMIuDMFiotKNkcHbghSEmqO-qBA  ",
  authDomain: "queue-management.firebaseapp.com",
  projectId: "queue-management-d1a1d",
  storageBucket: "queue-management.appspot.com",
  messagingSenderId: "875063695536",
  appId: "1:875063695536:web:9db2ec25159f128c7b8375"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

