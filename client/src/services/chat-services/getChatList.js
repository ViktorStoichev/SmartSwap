// Service for handling chat list data fetching from Firestore

import { db } from "../../../server/firebase";
import { collection, query, where, getDocs } from 'firebase/firestore';
import { getUserData } from '../auth-services/getUserProfile';

// Get the last message from a chat's message array
export const getLastMessage = (messages) => {
    if (!messages || messages.length === 0) return null;
    
    // Sort messages by timestamp and get the last one
    const sortedMessages = [...messages].sort((a, b) => {
        const timeA = a.timestamp?.toDate?.() || a.timestamp || new Date(0);
        const timeB = b.timestamp?.toDate?.() || b.timestamp || new Date(0);
        return timeB - timeA;
    });

    const lastMessage = sortedMessages[0];
    return {
        text: lastMessage.message || lastMessage.text || 'No message content',
        timestamp: lastMessage.timestamp
    };
};

// Fetch all chats for a specific user
export const fetchUserChats = async (userId) => {
    try {
        // Query chats where the user is a participant
        const chatsQuery = query(
            collection(db, 'chats'),
            where('participants', 'array-contains', userId)
        );

        const querySnapshot = await getDocs(chatsQuery);
        const chatList = [];

        // Process each chat document
        for (const doc of querySnapshot.docs) {
            const chatData = doc.data();
            if (!chatData.participants) continue;

            // Find the other user's ID (not the current user)
            const otherUserId = chatData.participants.find(id => id !== userId);
            if (!otherUserId) continue;

            try {
                // Fetch the other user's profile data
                const otherUserData = await getUserData(otherUserId);
                
                // Get the last message from the chat data
                const lastMessageData = getLastMessage(chatData.messages);
                
                if (otherUserData) {
                    chatList.push({
                        id: doc.id,
                        ...chatData,
                        otherUser: {
                            id: otherUserId,
                            username: otherUserData.username || 'Unknown User',
                            avatarUrl: otherUserData.avatarUrl || '/default-avatar.png'
                        },
                        lastMessage: lastMessageData?.text || 'No messages yet',
                        lastMessageTime: lastMessageData?.timestamp || null
                    });
                }
            } catch (error) {
                // Handle case where user data can't be fetched
                console.error(`Error fetching data for chat ${doc.id}:`, error);
                chatList.push({
                    id: doc.id,
                    ...chatData,
                    otherUser: {
                        id: otherUserId,
                        username: 'Unknown User',
                        avatarUrl: '/default-avatar.png'
                    },
                    lastMessage: 'No messages yet',
                    lastMessageTime: null
                });
            }
        }

        // Sort chats by last message time (most recent first)
        chatList.sort((a, b) => {
            const timeA = a.lastMessageTime?.toDate?.() || a.lastMessageTime || new Date(0);
            const timeB = b.lastMessageTime?.toDate?.() || b.lastMessageTime || new Date(0);
            return timeB - timeA;
        });

        return chatList;
    } catch (error) {
        // Log error and return empty array
        console.error('Error fetching chats:', error);
        return [];
    }
}; 