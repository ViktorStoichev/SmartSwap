import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../server/firebase";

export const getUserPhones = async (userId) => {
    const postsRef = collection(db, "items");
    const q = query(postsRef, where("ownerId", "==", userId));
    const querySnapshot = await getDocs(q);

    const posts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    return posts;
};