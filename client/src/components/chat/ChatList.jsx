import { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { db } from '../../../server/firebase';
import { useAuth } from '../../contexts/AuthContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { getUserData } from '../../services/getUserProfile';
import Loader from '../main/loader/Loader';
import './ChatList.css';

const ChatList = () => {
    const { user } = useAuth();
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const getLastMessage = (messages) => {
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

    const fetchChats = useCallback(async () => {
        try {
            setLoading(true);
            const chatsQuery = query(
                collection(db, 'chats'),
                where('participants', 'array-contains', user.uid)
            );

            const querySnapshot = await getDocs(chatsQuery);
            const chatList = [];

            // First, get all chats
            for (const doc of querySnapshot.docs) {
                const chatData = doc.data();
                if (!chatData.participants) continue;

                const otherUserId = chatData.participants.find(id => id !== user.uid);
                if (!otherUserId) continue;

                try {
                    // Fetch the other user's data
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

            // Sort chats by lastMessageTime in memory
            chatList.sort((a, b) => {
                const timeA = a.lastMessageTime?.toDate?.() || a.lastMessageTime || new Date(0);
                const timeB = b.lastMessageTime?.toDate?.() || b.lastMessageTime || new Date(0);
                return timeB - timeA;
            });

            setChats(chatList);
        } catch (error) {
            console.error('Error fetching chats:', error);
            setChats([]);
        } finally {
            setLoading(false);
        }
    }, [user.uid]);

    useEffect(() => {
        fetchChats();
    }, [fetchChats]);

    const formatLastMessageTime = (timestamp) => {
        if (!timestamp) return '';
        const date = timestamp instanceof Date ? timestamp : timestamp.toDate?.() || new Date(timestamp);
        const now = new Date();
        const diff = now - date;
        
        if (diff < 24 * 60 * 60 * 1000) {
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } else if (diff < 7 * 24 * 60 * 60 * 1000) {
            return date.toLocaleDateString([], { weekday: 'short' });
        } else {
            return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
        }
    };

    const filteredChats = useMemo(() => {
        if (!searchTerm) return chats;
        return chats.filter(chat => 
            chat?.otherUser?.username?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [chats, searchTerm]);

    const chatElements = useMemo(() => 
        filteredChats.map((chat) => {
            if (!chat?.otherUser?.id) return null;

            return (
                <Link to={`/chat/${chat.otherUser.id}`} key={chat.id} className="chat-link">
                    <div className="chat-item">
                        <div className="chat-item-avatar">
                            <img 
                                src={chat.otherUser.avatarUrl || '/default-avatar.png'} 
                                alt={chat.otherUser.username || 'User'} 
                            />
                            {chat.unreadCount > 0 && (
                                <span className="unread-badge">{chat.unreadCount}</span>
                            )}
                        </div>
                        <div className="chat-item-content">
                            <div className="chat-item-header">
                                <h3>{chat.otherUser.username || 'Unknown User'}</h3>
                                <span className="chat-item-time">
                                    {formatLastMessageTime(chat.lastMessageTime)}
                                </span>
                            </div>
                            <p className="chat-item-last-message">
                                {chat.lastMessage}
                            </p>
                        </div>
                    </div>
                </Link>
            );
        }).filter(Boolean), [filteredChats]);

    return (
        <div className="chat-list">
            <div className="chat-list-header">
                <h2>Messages</h2>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search chats..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>
            </div>
            <div className="chat-list-content">
                {loading ? (
                    <Loader />
                ) : filteredChats.length === 0 ? (
                    <div className="chat-list-empty">
                        {searchTerm ? (
                            <>
                                <i className="fas fa-search"></i>
                                <p>No chats found for "{searchTerm}"</p>
                            </>
                        ) : (
                            <>
                                <i className="fas fa-comments"></i>
                                <p>No chats available</p>
                                <p className="chat-list-empty-subtitle">
                                    Start a conversation by viewing a product and clicking the contact button
                                </p>
                            </>
                        )}
                    </div>
                ) : (
                    chatElements
                )}
            </div>
        </div>
    );
};

export default memo(ChatList);
