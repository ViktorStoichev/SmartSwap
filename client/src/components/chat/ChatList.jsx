import { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useChatList } from '../../hook-api/chat-hooks/UseChatList';
import Loader from '../main/loader/Loader';
import './ChatList.css';

const ChatList = () => {
    // Get all chat list state and handlers from the custom hook
    const {
        loading,
        searchTerm,
        filteredChats,
        formatLastMessageTime,
        handleSearchChange
    } = useChatList();

    // Memoized chat elements JSX to prevent unnecessary re-renders
    const chatElements = useMemo(() => 
        filteredChats.map((chat) => {
            if (!chat?.otherUser?.id) return null;

            return (
                <Link to={`/chat/${chat.otherUser.id}`} key={chat.id} className="chat-link">
                    <div className="chat-item">
                        {/* User avatar with unread badge */}
                        <div className="chat-item-avatar">
                            <img 
                                src={chat.otherUser.avatarUrl || '/default-avatar.png'} 
                                alt={chat.otherUser.username || 'User'} 
                            />
                            {chat.unreadCount > 0 && (
                                <span className="unread-badge">{chat.unreadCount}</span>
                            )}
                        </div>
                        
                        {/* Chat item content with user info and last message */}
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
        }).filter(Boolean), [filteredChats, formatLastMessageTime]);

    return (
        <div className="chat-list">
            {/* Chat list header with search functionality */}
            <div className="chat-list-header">
                <h2>Messages</h2>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search chats..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="search-input"
                    />
                </div>
            </div>
            
            {/* Chat list content */}
            <div className="chat-list-content">
                {/* Show loading spinner while fetching data */}
                {loading ? (
                    <Loader />
                ) : filteredChats.length === 0 ? (
                    /* Empty state when no chats are available */
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
                    /* Render chat list items */
                    chatElements
                )}
            </div>
        </div>
    );
};

export default memo(ChatList);
