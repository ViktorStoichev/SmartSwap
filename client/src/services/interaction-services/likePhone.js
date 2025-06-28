// Like Phone Service
// Handles like/unlike functionality for phone listings
// Uses Firebase arrayUnion/arrayRemove to toggle user likes

import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../server/firebase";

export const likePhone = async (phoneId, isLiked, userId) => {
    // Get reference to the specific phone document in Firestore
    const productRef = doc(db, "items", phoneId);

    // Update the likes array based on current like status
    // If already liked, remove user ID; if not liked, add user ID
    return await updateDoc(productRef, {
        likes: isLiked ? arrayRemove(userId) : arrayUnion(userId),
    });
};