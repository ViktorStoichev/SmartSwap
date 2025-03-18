import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../server/firebase";


export const useRegister = () => {

    const register = async (email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            return userCredential.user;
        } catch (error) {
            console.error("Registration error: ", error.message);
            throw error;
        }
    };

    return { register };
};