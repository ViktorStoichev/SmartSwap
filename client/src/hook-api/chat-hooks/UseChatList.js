// Custom hook for handling chat list functionality with complete state management

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { fetchUserChats } from '../../services/chat-services/getChatList';

export const useChatList = () => {
    // Get current user from authentication context
    const { user } = useAuth();
    
    // State for storing chat list data and UI state
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch all chats for the current user
    const fetchChats = useCallback(async () => {
        try {
            // Set loading state while fetching data
            setLoading(true);
            
            // Fetch chat list from the service
            const chatList = await fetchUserChats(user.uid);
            
            // Update chats state with fetched data
            setChats(chatList);
        } catch (error) {
            // Log error and set empty array if fetching fails
            console.error('Error fetching chats:', error);
            setChats([]);
        } finally {
            // Mark loading as complete
            setLoading(false);
        }
    }, [user.uid]);

    // Fetch chats when component mounts or user changes
    useEffect(() => {
        fetchChats();
    }, [fetchChats]);

    // Format last message time for display
    const formatLastMessageTime = useCallback((timestamp) => {
        if (!timestamp) return '';
        
        // Convert timestamp to Date object
        const date = timestamp instanceof Date ? timestamp : timestamp.toDate?.() || new Date(timestamp);
        const now = new Date();
        const diff = now - date;
        
        // Show time for messages from today
        if (diff < 24 * 60 * 60 * 1000) {
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } 
        // Show day for messages from this week
        else if (diff < 7 * 24 * 60 * 60 * 1000) {
            return date.toLocaleDateString([], { weekday: 'short' });
        } 
        // Show date for older messages
        else {
            return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
        }
    }, []);

    // Filter chats based on search term
    const filteredChats = useMemo(() => {
        if (!searchTerm) return chats;
        
        // Filter chats by username (case-insensitive)
        return chats.filter(chat => 
            chat?.otherUser?.username?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [chats, searchTerm]);

    // Handle search input changes
    const handleSearchChange = useCallback((e) => {
        setSearchTerm(e.target.value);
    }, []);

    // Refresh chat list
    const refreshChats = useCallback(() => {
        fetchChats();
    }, [fetchChats]);

    // Return all state values and handlers for the component to use
    return {
        // State
        chats,
        loading,
        searchTerm,
        filteredChats,
        
        // Utility functions
        formatLastMessageTime,
        
        // Handlers
        handleSearchChange,
        refreshChats
    };
};