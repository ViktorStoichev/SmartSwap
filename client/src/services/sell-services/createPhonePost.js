// Create Phone Post Service
// Creates a new phone listing document in Firebase Firestore
// Generates a unique document ID and stores complete phone data

import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../../server/firebase";

export const createPhonePost = async (phoneData) => {
    // Create a new document reference with auto-generated ID
    const newDocRef = doc(collection(db, "items"));

    // Add the generated document ID to the phone data
    phoneData._id = newDocRef.id;

    // Store the complete phone data in the new document
    return await setDoc(newDocRef, phoneData);
}