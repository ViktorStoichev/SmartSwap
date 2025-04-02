import { doc, getDoc } from "firebase/firestore";
import { db } from "../../server/firebase";

export const getChatMessages = async (userId, partnerId) => {
    const chatId = userId < partnerId ? userId + '_' + partnerId : partnerId + '_' + userId;
    const chatRef = doc(db, 'chats', chatId);
    const chatDoc = await getDoc(chatRef);
    
    return chatDoc.exists() ? chatDoc.data().messages : [];
};