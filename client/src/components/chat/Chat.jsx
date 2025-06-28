import { memo, useMemo } from 'react';
import './Chat.css';
import { useChat } from '../../hook-api/chat-hooks/UseChat';
import Loader from '../main/loader/Loader';

const Chat = () => {
    // Get all chat state and handlers from the custom hook
    const {
        state,
        isLoading,
        isOnline,
        messagesEndRef,
        groupedMessages,
        userId,
        formatMessageTime,
        handleSendMessage,
        handleKeyPress,
        handleInputChange,
        handleBackNavigation
    } = useChat();

    // Memoized rendered messages JSX to prevent unnecessary re-renders
    const renderedMessages = useMemo(() => {
        return Object.entries(groupedMessages).map(([date, messages]) => (
            <div key={date} className="message-group">
                <div className="date-header">
                    <span>{date}</span>
                </div>
                <div className="messages-container">
                    {messages.map((msg, index) => (
                        <div key={index} className={`message ${msg.senderId === userId ? 'sent' : 'received'}`}>
                            <div className="message-content">
                                <span className="message-text">{msg.message}</span>
                                <span className="message-time">{formatMessageTime(msg.timestamp)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ));
    }, [groupedMessages, formatMessageTime, userId]);

    return (
        <div className="chat-container">
            {/* Show loading spinner while initializing chat */}
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    {/* Chat header with partner information and actions */}
                    {state.partner && (
                        <div className="chat-header">
                            <div className="chat-header-left">
                                {/* Back button to return to chat list */}
                                <button className="chat-back-button" onClick={handleBackNavigation}>
                                    ←
                                </button>
                                {/* Partner avatar */}
                                <img 
                                    src={state.partner.avatarUrl || '/default-avatar.png'} 
                                    alt="Avatar" 
                                    className="avatar" 
                                />
                                {/* Partner information and online status */}
                                <div className="partner-info">
                                    <h2>{state.partner.username}</h2>
                                    <span className={`status ${isOnline ? 'online' : 'offline'}`}>
                                        {isOnline ? 'Online' : 'Offline'}
                                    </span>
                                </div>
                            </div>
                            {/* Chat action buttons */}
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
                    
                    {/* Messages container */}
                    <div className="messages">
                        {/* Show loading state while fetching messages */}
                        {isLoading ? (
                            <div className="loading-messages">
                                <div className="loading-spinner"></div>
                                <p>Loading messages...</p>
                            </div>
                        ) : renderedMessages.length === 0 ? (
                            /* Empty state when no messages exist */
                            <div className="empty-messages">
                                <i className="fas fa-comments"></i>
                                <p>No messages yet</p>
                                <p className="empty-messages-subtitle">
                                    Start the conversation by sending a message
                                </p>
                            </div>
                        ) : (
                            /* Render grouped messages by date */
                            renderedMessages
                        )}
                        {/* Invisible element for auto-scrolling */}
                        <div ref={messagesEndRef}></div>
                    </div>
                    
                    {/* Message input and send button */}
                    <div className="send-message">
                        <textarea
                            value={state.newMessage}
                            onChange={handleInputChange}
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
