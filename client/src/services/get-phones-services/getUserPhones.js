// Get User Phones Service
// Retrieves all phone listings owned by a specific user
// Uses Firestore query to filter by owner ID

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../server/firebase";

export const getUserPhones = async (userId) => {
    // Get reference to the items collection
    const postsRef = collection(db, "items");
    
    // Create query to filter by owner ID
    const q = query(postsRef, where("ownerId", "==", userId));
    
    // Execute the query
    const querySnapshot = await getDocs(q);

    // Transform Firestore documents into plain objects with document IDs
    const posts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    return posts;
};