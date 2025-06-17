import { useState, useEffect, useCallback, useMemo, memo, useRef, useLayoutEffect, useReducer } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Chat.css';
import { chatReducer, initialChatState } from './MessageReducer';
import { getUserData } from '../../services/getUserProfile';
import { getChatMessages } from '../../services/getChatMessages';
import { sendChatMessage } from '../../services/sendChatMessage';
import Loader from '../main/loader/Loader';

const Chat = () => {
    const { user } = useAuth();
    const { partnerId } = useParams();
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(chatReducer, initialChatState);
    const messagesEndRef = useRef(null);
    const [optimisticMessages, setOptimisticMessages] = useState([]);
    const [isOnline, setIsOnline] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const fetchMessages = useCallback(async () => {
        try {
            setIsLoading(true);
            const messages = await getChatMessages(user.uid, partnerId);
            dispatch({ type: 'SET_MESSAGES', payload: messages });
        } catch (error) {
            console.error('Error fetching messages:', error);
        } finally {
            setIsLoading(false);
        }
    }, [user.uid, partnerId]);

    const fetchPartnerData = useCallback(async () => {
        try {
            const partnerData = await getUserData(partnerId);
            dispatch({ type: 'SET_PARTNER', payload: partnerData });
            // Simulate online status (replace with actual online status logic)
            setIsOnline(Math.random() > 0.5);
        } catch (error) {
            console.error('Error fetching partner data:', error);
            navigate('/chats');
        }
    }, [partnerId, navigate]);

    useEffect(() => {
        fetchMessages();
        fetchPartnerData();
    }, [fetchMessages, fetchPartnerData]);

    useLayoutEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ 
                behavior: 'smooth',
                block: 'end'
            });
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

        try {
            await sendChatMessage(user, state.partner, partnerId, newMsg);
            setOptimisticMessages((prev) => prev.filter((msg) => msg !== newMsg));
            dispatch({ type: 'ADD_MESSAGE', payload: { ...newMsg, optimistic: false } });
        } catch (error) {
            console.error('Error sending message:', error);
            setOptimisticMessages((prev) => prev.filter((msg) => msg !== newMsg));
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const formatMessageTime = (timestamp) => {
        if (!timestamp) return '';
        
        // Handle Firestore Timestamp
        if (timestamp.toDate) {
            return timestamp.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
        
        // Handle regular Date object
        if (timestamp instanceof Date) {
            return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
        
        // Handle timestamp number or string
        try {
            const date = new Date(timestamp);
            if (!isNaN(date.getTime())) {
                return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            }
        } catch (error) {
            console.error('Error formatting timestamp:', error);
        }
        
        return '';
    };

    const formatMessageDate = (timestamp) => {
        if (!timestamp) return '';
        
        let date;
        if (timestamp.toDate) {
            date = timestamp.toDate();
        } else if (timestamp instanceof Date) {
            date = timestamp;
        } else {
            try {
                date = new Date(timestamp);
                if (isNaN(date.getTime())) return '';
            } catch (error) {
                console.error('Error formatting date:', error);
                return '';
            }
        }

        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.toDateString() === today.toDateString()) {
            return 'Today';
        } else if (date.toDateString() === yesterday.toDateString()) {
            return 'Yesterday';
        } else {
            return date.toLocaleDateString('en-US', { 
                weekday: 'long',
                month: 'long',
                day: 'numeric'
            });
        }
    };

    const groupMessagesByDate = (messages) => {
        const groups = {};
        
        messages.forEach(msg => {
            const date = formatMessageDate(msg.timestamp);
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(msg);
        });

        return groups;
    };

    const renderedMessages = useMemo(() => {
        const allMessages = [...state.messages, ...optimisticMessages];
        const groupedMessages = groupMessagesByDate(allMessages);

        return Object.entries(groupedMessages).map(([date, messages]) => (
            <div key={date} className="message-group">
                <div className="date-header">
                    <span>{date}</span>
                </div>
                <div className="messages-container">
                    {messages.map((msg, index) => (
                        <div key={index} className={`message ${msg.senderId === user.uid ? 'sent' : 'received'} ${msg.optimistic ? 'pending' : ''}`}>
                            <div className="message-content">
                                <span className="message-text">{msg.message}</span>
                                <span className="message-time">{formatMessageTime(msg.timestamp)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ));
    }, [state.messages, optimisticMessages, user.uid]);

    return (
        <div className="chat-container">
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    {state.partner && (
                        <div className="chat-header">
                            <div className="chat-header-left">
                                <button className="chat-back-button" onClick={() => navigate('/chat-list')}>
                                    ←
                                </button>
                                <img 
                                    src={state.partner.avatarUrl || '/default-avatar.png'} 
                                    alt="Avatar" 
                                    className="avatar" 
                                />
                                <div className="partner-info">
                                    <h2>{state.partner.username}</h2>
                                    <span className={`status ${isOnline ? 'online' : 'offline'}`}>
                                        {isOnline ? 'Online' : 'Offline'}
                                    </span>
                                </div>
                            </div>
                            <div className="chat-header-right">
                                <button className="action-button">
                                    <i className="fas fa-phone"></i>
                                </button>
                                <button className="action-button">
                                    <i className="fas fa-video"></i>
                                </button>
                                <button className="action-button">
                                    <i className="fas fa-ellipsis-v"></i>
                                </button>
                            </div>
                        </div>
                    )}
                    <div className="messages">
                        {isLoading ? (
                            <div className="loading-messages">
                                <div className="loading-spinner"></div>
                                <p>Loading messages...</p>
                            </div>
                        ) : renderedMessages.length === 0 ? (
                            <div className="empty-messages">
                                <i className="fas fa-comments"></i>
                                <p>No messages yet</p>
                                <p className="empty-messages-subtitle">
                                    Start the conversation by sending a message
                                </p>
                            </div>
                        ) : (
                            renderedMessages
                        )}
                        <div ref={messagesEndRef}></div>
                    </div>
                    <div className="send-message">
                        <textarea
                            value={state.newMessage}
                            onChange={(e) => dispatch({ type: 'SET_NEW_MESSAGE', payload: e.target.value })}
                            onKeyPress={handleKeyPress}
                            placeholder="Type a message..."
                            rows={1}
                        />
                        <button 
                            onClick={handleSendMessage}
                            disabled={!state.newMessage.trim()}
                            className={!state.newMessage.trim() ? 'disabled' : ''}
                        >
                            <i className="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default memo(Chat);
