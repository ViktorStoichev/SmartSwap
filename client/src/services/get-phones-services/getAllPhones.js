// Get All Phones Service
// Retrieves all phone listings from Firebase Firestore
// Transforms Firestore documents into application-friendly format

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../server/firebase";

export const getAllPhones = async () => {
    // Fetch all documents from the "items" collection
    const querySnapshot = await getDocs(collection(db, "items"));
    
    // Transform Firestore documents into plain objects with document IDs
    const itemsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    return itemsList;
}