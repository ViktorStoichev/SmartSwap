// Custom hook for handling chat functionality with complete state management

import { useState, useEffect, useCallback, useMemo, useRef, useLayoutEffect, useReducer } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { chatReducer, initialChatState } from '../../components/chat/MessageReducer';
import { getUserData } from '../../services/auth-services/getUserProfile';
import { listenToChatMessages } from '../../services/chat-services/getChatMessages';
import { sendChatMessage } from '../../services/chat-services/sendChatMessage';

export const useChat = () => {
    // Get current user and navigation from React Router
    const { user } = useAuth();
    const { partnerId } = useParams();
    const navigate = useNavigate();
    
    // Chat state management using useReducer
    const [state, dispatch] = useReducer(chatReducer, initialChatState);
    
    // Refs and state for UI management
    const messagesEndRef = useRef(null);
    const [isOnline, setIsOnline] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch partner data and simulate online status
    const fetchPartnerData = useCallback(async () => {
        try {
            // Get partner's profile data from the server
            const partnerData = await getUserData(partnerId);
            
            // Update chat state with partner information
            dispatch({ type: 'SET_PARTNER', payload: partnerData });
            
            // Simulate online status (replace with actual online status logic)
            setIsOnline(Math.random() > 0.5);
        } catch (error) {
            // Log error and navigate back to chat list if partner not found
            console.error('Error fetching partner data:', error);
            navigate('/chats');
        }
    }, [partnerId, navigate]);
    
    // Set up real-time message listening and partner data fetching
    useEffect(() => {
        // Fetch partner data when component mounts
        fetchPartnerData();
        setIsLoading(true);
        
        // Set up real-time listener for chat messages
        const unsubscribe = listenToChatMessages(user.uid, partnerId, (messages) => {
            // Update messages in state when new messages arrive
            dispatch({ type: 'SET_MESSAGES', payload: messages });
            setIsLoading(false);
        });
    
        // Cleanup function to unsubscribe from real-time updates
        return () => unsubscribe();
    }, [user.uid, partnerId, fetchPartnerData]);

    // Auto-scroll to bottom when new messages arrive
    useLayoutEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ 
                behavior: 'smooth',
                block: 'end'
            });
        }
    }, [state.messages]);

    // Handle sending new messages
    const handleSendMessage = useCallback(async () => {
        // Don't send empty messages
        if (!state.newMessage.trim()) return;

        // Create new message object
        const newMsg = {
            senderId: user.uid,
            receiverId: partnerId,
            message: state.newMessage,
            timestamp: new Date()
        };

        // Clear the input field immediately for better UX
        dispatch({ type: 'SET_NEW_MESSAGE', payload: '' });

        try {
            // Send message to the server
            await sendChatMessage(user, state.partner, partnerId, newMsg);
        } catch (error) {
            // Log error if message sending fails
            console.error('Error sending message:', error);
        }
    }, [user, partnerId, state.newMessage, state.partner]);

    // Format message timestamp to readable time
    const formatMessageTime = useCallback((timestamp) => {
        if (!timestamp) return '';
        
        // Handle Firestore timestamp objects
        if (timestamp.toDate) {
            return timestamp.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
        
        // Handle Date objects
        if (timestamp instanceof Date) {
            return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
        
        // Handle string timestamps
        try {
            const date = new Date(timestamp);
            if (!isNaN(date.getTime())) {
                return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            }
        } catch (error) {
            console.error('Error formatting timestamp:', error);
        }
        return '';
    }, []);

    // Format message date for grouping messages
    const formatMessageDate = useCallback((timestamp) => {
        if (!timestamp) return '';
        
        let date;
        
        // Handle different timestamp formats
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
        
        // Compare with today and yesterday
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
    }, []);

    // Group messages by date for better organization
    const groupMessagesByDate = useCallback((messages) => {
        const groups = {};
        messages.forEach(msg => {
            const date = formatMessageDate(msg.timestamp);
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(msg);
        });
        return groups;
    }, [formatMessageDate]);

    // Memoized grouped messages data to prevent unnecessary recalculations
    const groupedMessages = useMemo(() => {
        return groupMessagesByDate(state.messages);
    }, [state.messages, groupMessagesByDate]);

    // Handle Enter key press for sending messages
    const handleKeyPress = useCallback((e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    }, [handleSendMessage]);

    // Handle input change for new message
    const handleInputChange = useCallback((e) => {
        dispatch({ type: 'SET_NEW_MESSAGE', payload: e.target.value });
    }, []);

    // Navigate back to chat list
    const handleBackNavigation = useCallback(() => {
        navigate('/chat-list');
    }, [navigate]);

    // Return all state values and handlers for the component to use
    return {
        // State
        state,
        isLoading,
        isOnline,
        messagesEndRef,
        groupedMessages,
        userId: user.uid,
        
        // Utility functions
        formatMessageTime,
        
        // Handlers
        handleSendMessage,
        handleKeyPress,
        handleInputChange,
        handleBackNavigation
    };
};