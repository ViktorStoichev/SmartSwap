import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../server/firebase";


export const commentPhone = async (phoneId, newComment) => {
    const productRef = doc(db, "items", phoneId);
    
    return await updateDoc(productRef, {
        comments: arrayUnion(newComment),
    });
};