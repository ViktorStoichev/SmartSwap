// Service for handling user registration with Firebase and Firestore

import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../server/firebase";

// Create a new user account and store additional data in Firestore
export const registerUser = async (email, password, repeatPassword, username, address, avatarUrl) => {
    try {
        // Call Firebase authentication service to create new user account
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        // Create user document in Firestore with additional profile data
        const userRef = doc(db, "users", userCredential.user.uid);
        await setDoc(userRef, { uid: userCredential.user.uid, email, username, address, avatarUrl });
        
        // Return the created user object on success
        return userCredential.user;
    } catch (error) {
        // Log registration error for debugging purposes
        console.error("Registration error: ", error.message);
        
        // Re-throw error to be handled by the calling component
        throw error;
    }
}; 