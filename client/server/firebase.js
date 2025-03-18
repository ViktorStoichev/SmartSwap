import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC4sqerWz_1Zw1KO0FKVAJscTqWUZsepLs",
    authDomain: "thrift-shop-686da.firebaseapp.com",
    projectId: "thrift-shop-686da",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);