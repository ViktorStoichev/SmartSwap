import { useState, useEffect, useCallback, useMemo, memo, useRef, useLayoutEffect, useReducer, useOptimistic } from 'react';
import { db } from '../../../server/firebase';
import { doc, updateDoc, setDoc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Chat.css';
import { chatReducer, initialChatState } from './MessageReducer';

const Chat = () => {
    const { user } = useAuth();
    const { partnerId } = useParams();
    const [state, dispatch] = useReducer(chatReducer, initialChatState);
    const messagesEndRef = useRef(null);
    const [optimisticMessages, setOptimisticMessages] = useState([]);

    const fetchMessages = useCallback(async () => {
        const chatId = user.uid < partnerId ? user.uid + '_' + partnerId : partnerId + '_' + user.uid;
        const chatRef = doc(db, 'chats', chatId);
        const chatDoc = await getDoc(chatRef);

        if (chatDoc.exists()) {
            dispatch({ type: 'SET_MESSAGES', payload: chatDoc.data().messages });
        }
    }, [user.uid, partnerId]);

    const fetchPartnerData = useCallback(async () => {
        const partnerDocRef = doc(db, 'users', partnerId);
        const partnerDoc = await getDoc(partnerDocRef);

        if (partnerDoc.exists()) {
            dispatch({ type: 'SET_PARTNER', payload: partnerDoc.data() });
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
    }, [state.messages, optimisticMessages]);

    const handleSendMessage = async () => {
        if (!state.newMessage.trim()) return;

        const newMsg = {
            senderId: user.uid,
            receiverId: partnerId,
            message: state.newMessage,
            timestamp: new Date(),
            optimistic: true
        };

        setOptimisticMessages((prev) => [...prev, newMsg]);
        dispatch({ type: 'SET_NEW_MESSAGE', payload: '' });

        const chatId = user.uid < partnerId ? user.uid + '_' + partnerId : partnerId + '_' + user.uid;
        const chatRef = doc(db, 'chats', chatId);

        try {
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
                        [partnerId]: { id: partnerId, username: state.partner?.username }
                    },
                    messages: [{ ...newMsg, optimistic: false }]
                });
            }
            setOptimisticMessages((prev) => prev.filter((msg) => msg !== newMsg));
            dispatch({ type: 'ADD_MESSAGE', payload: { ...newMsg, optimistic: false } });
        } catch (error) {
            console.error('Error sending message:', error);
            setOptimisticMessages((prev) => prev.filter((msg) => msg !== newMsg));
        }
    };

    const renderedMessages = useMemo(() =>
        [...state.messages, ...optimisticMessages].map((msg, index) => (
            <div key={index} className={`message ${msg.senderId === user.uid ? 'sent' : 'received'} ${msg.optimistic ? 'pending' : ''}`}>
                <span>{msg.message}</span>
            </div>
        )), [state.messages, optimisticMessages, user.uid]);

    return (
        <div className="chat-container">
            {state.partner && (
                <div className="chat-header">
                    <img src={state.partner.avatarUrl || 'default-avatar.png'} alt="Avatar" className="avatar" />
                    <h2>Chat with {state.partner.username}</h2>
                </div>
            )}
            <div className="messages">
                {renderedMessages}
                <div ref={messagesEndRef}></div>
            </div>
            <div className="send-message">
                <textarea
                    value={state.newMessage}
                    onChange={(e) => dispatch({ type: 'SET_NEW_MESSAGE', payload: e.target.value })}
                    placeholder="Type a message"
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default memo(Chat);
