import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../server/firebase";

export const useLogin = () => {

    const login = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return userCredential.user;
        } catch (error) {
            console.error("Entry error: ", error.message);
            throw error;
        }
    };

    return { login };
};