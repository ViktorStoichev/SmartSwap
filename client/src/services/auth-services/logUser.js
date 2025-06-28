// Service for handling user authentication with Firebase

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../server/firebase";

// Authenticate user with email and password using Firebase
export const logUser = async (email, password) => {
    try {
        // Call Firebase authentication service with provided credentials
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        
        // Return the authenticated user object on success
        return userCredential.user;
    } catch (error) {
        // Log authentication error for debugging purposes
        console.error("Login error: ", error.message);
        
        // Re-throw error to be handled by the calling component
        throw error;
    }
}; 