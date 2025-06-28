// Comment Phone Service
// Adds a new comment to a phone listing in Firebase Firestore
// Uses arrayUnion to append comments without overwriting existing ones

import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../server/firebase";

export const commentPhone = async (phoneId, newComment) => {
    // Get reference to the specific phone document in Firestore
    const productRef = doc(db, "items", phoneId);
    
    // Update the document by adding the new comment to the comments array
    // arrayUnion ensures the comment is added without affecting existing comments
    return await updateDoc(productRef, {
        comments: arrayUnion(newComment),
    });
};