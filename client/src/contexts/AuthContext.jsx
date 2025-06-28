// Authentication Context
// Provides global authentication state management using Firebase Auth
// Handles user authentication state, loading states, and user data fetching

import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../server/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getUserData } from "../services/auth-services/getUserProfile";

// Create context for authentication state
const AuthContext = createContext();

// Authentication provider component that wraps the app
export const AuthProvider = ({ children }) => {
  // User state - contains Firebase user data + custom user profile data
  const [user, setUser] = useState(null);
  
  // Loading state - indicates if authentication check is in progress
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Subscribe to Firebase authentication state changes
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // User is authenticated - fetch additional profile data
        const data = await getUserData(currentUser.uid);
        // Combine Firebase user data with custom profile data
        setUser({ ...currentUser, ...data });
      } else {
        // User is not authenticated - clear user state
        setUser(null);
      }

      // Authentication check complete - set loading to false
      setIsLoading(false);
    });

    // Cleanup subscription when component unmounts
    return () => unsubscribe();
  }, []);

  // Provide authentication context to child components
  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access authentication context
// Returns user object and loading state
export const useAuth = () => {
  return useContext(AuthContext);
};
