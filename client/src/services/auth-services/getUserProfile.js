// Get User Profile Service
// Retrieves user profile data from Firebase Firestore
// Handles user data fetching with error handling and null checks

import { db } from "../../../server/firebase";
import { doc, getDoc } from "firebase/firestore";

export const getUserData = async (userId) => {
    // Return null if no userId is provided
    if (!userId) return null;

    try {
        // Get reference to the user document in Firestore
        const userRef = doc(db, "users", userId);
        
        // Fetch the user document snapshot
        const userSnap = await getDoc(userRef);
        
        // Return user data if document exists, otherwise return null
        return userSnap.exists() ? userSnap.data() : null;
    } catch (error) {
        // Log error and return null if data fetching fails
        console.error("Error fetching user data:", error);
        return null;
    }
};
