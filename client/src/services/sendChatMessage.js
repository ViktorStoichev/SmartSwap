import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../server/firebase";

export const sendChatMessage = async (user, partner, partnerId, newMsg) => {
    const chatId = user.uid < partnerId ? user.uid + '_' + partnerId : partnerId + '_' + user.uid;
    const chatRef = doc(db, 'chats', chatId);
    const chatDoc = await getDoc(chatRef);
    if (chatDoc.exists()) {
        await updateDoc(chatRef, {
            messages: [...chatDoc.data().messages, { ...newMsg, optimistic: false }],
        });
    } else {
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