import { useState, useEffect, useCallback, useMemo, memo, useRef, useLayoutEffect } from 'react';
import { db } from '../../../server/firebase';
import { doc, updateDoc, setDoc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Chat.css';

const Chat = () => {
    const { user } = useAuth();
    const { partnerId } = useParams(); // Извличаме partnerId от URL
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [partner, setPartner] = useState(null); // Състояние за партньора
    const messagesEndRef = useRef(null);

    const fetchMessages = useCallback(async () => {
        const chatId = user.uid < partnerId ? user.uid + '_' + partnerId : partnerId + '_' + user.uid;
        const chatRef = doc(db, 'chats', chatId); // Получаваме чат документ по уникален chatId

        const chatDoc = await getDoc(chatRef);
        if (chatDoc.exists()) {
            setMessages(chatDoc.data().messages);
        }
    }, [user.uid, partnerId]);

    const fetchPartnerData = useCallback(async () => {
        const partnerDocRef = doc(db, 'users', partnerId);
        const partnerDoc = await getDoc(partnerDocRef);

        if (partnerDoc.exists()) {
            setPartner(partnerDoc.data());
        }
    }, [partnerId]);

    useEffect(() => {

        fetchMessages();
        fetchPartnerData();
    }, [fetchMessages, fetchPartnerData]);

    useLayoutEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;

        const newMsg = {
            senderId: user.uid,
            receiverId: partnerId,
            message: newMessage,
            timestamp: new Date(),
        };

        const chatId = user.uid < partnerId ? user.uid + '_' + partnerId : partnerId + '_' + user.uid;
        const chatRef = doc(db, 'chats', chatId); // Получаваме чат документ по уникален chatId

        const chatDoc = await getDoc(chatRef);
        if (chatDoc.exists()) {
            // Ако чатът съществува, добавяме съобщението в масива
            await updateDoc(chatRef, {
                messages: [...chatDoc.data().messages, newMsg],
            });
        } else {
            // Ако чатът не съществува, създаваме нов чат с участниците
            await setDoc(chatRef, {
                participants: [user.uid, partnerId], // Списък само с ID-та за по-лесно търсене
                participantsInfo: {
                    [user.uid]: { id: user.uid, username: user.username },
                    [partnerId]: { id: partnerId, username: partner.username }
                },
                messages: [newMsg]
            });
        }

        setMessages((prevMessages) => [...prevMessages, newMsg]);
        setNewMessage('');
    };

    const renderedMessages = useMemo(() =>
        messages.map((msg, index) => (
            <div key={index} className={`message ${msg.senderId === user.uid ? 'sent' : 'received'}`}>
                <span>{msg.message}</span>
            </div>
        )), [messages, user.uid]);

    return (
        <div className="chat-container">
            {partner && (
                <div className="chat-header">
                    <img src={partner.avatarUrl || 'default-avatar.png'} alt="Avatar" className="avatar" />
                    <h2>Chat with {partner.username}</h2>
                </div>
            )}
            <div className="messages">
                {renderedMessages}
                <div ref={messagesEndRef}></div>
            </div>
            <div className="send-message">
                <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message"
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default memo(Chat);
