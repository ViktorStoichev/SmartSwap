// Phone Service - Admin Functions
// Provides admin functionality for managing pending phone listings
// Handles approval, rejection, and retrieval of pending phones

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../server/firebase";
import { editPhone } from '../phone-action-services/editPhone';
import { deletePhone } from '../phone-action-services/deletePhone';

// Retrieve all pending phone listings for admin review
export const getPendingPhones = async () => {
    // Query for all phones with pending status
    const q = query(collection(db, "items"), where("pending", "==", true));
    const querySnapshot = await getDocs(q);
    
    // Transform Firestore documents into plain objects with document IDs
    const itemsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    return itemsList;
};

// Approve a pending phone listing by setting pending to false
export const approvePhone = async (phoneId) => {
    return await editPhone(phoneId, { pending: false });
};

// Reject a pending phone listing by deleting it and its images
export const rejectPhone = async (phoneId, images) => {
    return await deletePhone(phoneId, images);
}; 