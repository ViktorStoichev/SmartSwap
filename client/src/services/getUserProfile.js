import { db } from "../../server/firebase";
import { doc, getDoc } from "firebase/firestore";

export const getUserData = async (userId) => {
    if (!userId) return null;

    try {
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);
        return userSnap.exists() ? userSnap.data() : null;
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
};
