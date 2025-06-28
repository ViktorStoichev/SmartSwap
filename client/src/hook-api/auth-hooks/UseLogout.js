// Logout Hook
// Manages user logout process using Firebase Authentication
// Handles sign-out operations and provides feedback on logout status

import { getAuth, signOut } from "firebase/auth";
import { auth } from "../../../server/firebase";

export const useLogout = () => {

    // Main logout function that handles user sign-out
    const logout = async () => {
        // Get current Firebase auth instance
        const loggedIn = getAuth();
        
        // Get current authenticated user
        const user = loggedIn.currentUser;
    
        // Check if user is currently authenticated
        if (user) {
            try {
                // Sign out the user from Firebase Authentication
                await signOut(auth);
                console.log("Successful logout!");
            } catch (error) {
                // Log any errors that occur during the logout process
                console.error("Logging out error: ", error.message);
            }
        } else {
            // Log message if no user is currently authenticated
            console.log("There is no current user for logging out!");
        }
    };

    // Return the logout function for use in components
    return { logout };
};