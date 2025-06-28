// Get One Phone Service
// Retrieves a single phone listing by ID from Firebase Firestore
// Returns phone data with document ID or undefined if not found

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../server/firebase";

export const getOnePhone = async (phoneId) => {
    // Get reference to the specific phone document in Firestore
    const docRef = doc(db, "items", phoneId);
    
    // Fetch the document snapshot
    const docSnap = await getDoc(docRef);
    
    // Check if document exists and return data with ID
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
    }

    // Return undefined if document doesn't exist
    return;
}