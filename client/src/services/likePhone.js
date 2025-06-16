import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../server/firebase";

export const likePhone = async (phoneId, isLiked, userId) => {
    const productRef = doc(db, "items", phoneId);

    return await updateDoc(productRef, {
        likes: isLiked ? arrayRemove(userId) : arrayUnion(userId),
    });
};