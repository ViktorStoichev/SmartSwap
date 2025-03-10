import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC4sqerWz_1Zw1KO0FKVAJscTqWUZsepLs",
    authDomain: "thrift-shop-686da.firebaseapp.com",
    projectId: "thrift-shop-686da",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const registerUser = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error("Грешка при регистрация:", error.message);
        throw error;
    }
};

export const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error("Грешка при вход:", error.message);
        throw error;
    }
};

export const logoutUser = async () => {
    const loggedIn = getAuth();
    const user = loggedIn.currentUser;

    if (user) {
        try {
            await signOut(auth);
            console.log("Успешно излизане");
        } catch (error) {
            console.error("Грешка при излизане:", error.message);
        }
    } else {
        console.log("Няма активен потребител за излизане");
    }
};