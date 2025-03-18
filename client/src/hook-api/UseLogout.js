import { getAuth, signOut } from "firebase/auth";
import { auth } from "../../server/firebase";

export const useLogout = () => {

    const logout = async () => {
        const loggedIn = getAuth();
        const user = loggedIn.currentUser;
    
        if (user) {
            try {
                await signOut(auth);
                console.log("Successful logout!");
            } catch (error) {
                console.error("Logging out error: ", error.message);
            }
        } else {
            console.log("There is no current user for logging out!");
        }
    };

    return { logout };
};