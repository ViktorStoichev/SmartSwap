// Send Chat Message Service
// Handles sending messages in chat conversations
// Creates new chat documents or updates existing ones with new messages

import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../server/firebase";

export const sendChatMessage = async (user, partner, partnerId, newMsg) => {
    // Generate consistent chat ID by sorting user IDs alphabetically
    // This ensures both users access the same chat document
    const chatId = user.uid < partnerId ? user.uid + '_' + partnerId : partnerId + '_' + user.uid;
    
    // Get reference to the chat document in Firestore
    const chatRef = doc(db, 'chats', chatId);
    
    // Check if chat document already exists
    const chatDoc = await getDoc(chatRef);
    
    if (chatDoc.exists()) {
        // Chat exists - append new message to existing messages array
        await updateDoc(chatRef, {
            messages: [...chatDoc.data().messages, { ...newMsg, optimistic: false }],
        });
    } else {
        // Chat doesn't exist - create new chat document with initial message
        await setDoc(chatRef, {
            participants: [user.uid, partnerId],
            participantsInfo: {
                [user.uid]: { id: user.uid, username: user.username },
                [partnerId]: { id: partnerId, username: partner.username }
            },
            messages: [{ ...newMsg, optimistic: false }]
        });
    }
};