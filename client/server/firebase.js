// Firebase configuration and initialization for SmartSwap application
// This module sets up Firebase services for authentication and database operations

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase project configuration with API credentials
const firebaseConfig = {
    apiKey: "AIzaSyC4sqerWz_1Zw1KO0FKVAJscTqWUZsepLs", // Firebase API key for authentication
    authDomain: "thrift-shop-686da.firebaseapp.com", // Authentication domain
    projectId: "thrift-shop-686da", // Firebase project identifier
};

// Initialize the main Firebase app instance
const app = initializeApp(firebaseConfig);

// Export Firebase Authentication service for user management
export const auth = getAuth(app);

// Export Firestore database service for data storage
export const db = getFirestore(app);