import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../server/firebase";

export const listenToChatMessages = (userId, partnerId, onMessagesUpdate) => {
    const chatId = userId < partnerId ? userId + '_' + partnerId : partnerId + '_' + userId;
    const chatRef = doc(db, 'chats', chatId);

    const unsubscribe = onSnapshot(chatRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            onMessagesUpdate(data.messages || []);
        } else {
            onMessagesUpdate([]); // No messages yet
        }
    }, (error) => {
        console.error("Error listening to chat:", error);
    });

    return unsubscribe;
};
