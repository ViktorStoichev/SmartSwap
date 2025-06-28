// Get Chat Messages Service
// Provides real-time chat message listening using Firebase Firestore
// Handles chat ID generation and real-time message updates

import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../server/firebase";

export const listenToChatMessages = (userId, partnerId, onMessagesUpdate) => {
    // Generate consistent chat ID by sorting user IDs alphabetically
    // This ensures both users access the same chat document
    const chatId = userId < partnerId ? userId + '_' + partnerId : partnerId + '_' + userId;
    
    // Get reference to the chat document in Firestore
    const chatRef = doc(db, 'chats', chatId);

    // Set up real-time listener for chat messages
    const unsubscribe = onSnapshot(chatRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
            // Chat document exists - extract messages array
            const data = docSnapshot.data();
            onMessagesUpdate(data.messages || []);
        } else {
            // Chat document doesn't exist yet - return empty array
            onMessagesUpdate([]); // No messages yet
        }
    }, (error) => {
        // Handle any errors during real-time listening
        console.error("Error listening to chat:", error);
    });

    // Return unsubscribe function to clean up listener
    return unsubscribe;
};
