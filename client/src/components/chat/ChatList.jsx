import { useState, useEffect } from 'react';
import { db } from '../../../server/firebase';
import { useAuth } from '../../contexts/AuthContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import './ChatList.css';

const ChatList = () => {
    const { user } = useAuth();
    const [chats, setChats] = useState([]);

    useEffect(() => {
        const fetchChats = async () => {
            const chatsQuery = query(
                collection(db, 'chats'),
                where('participants', 'array-contains', user.uid) // Търсим само по ID
            );

            const querySnapshot = await getDocs(chatsQuery);
            const chatList = [];

            querySnapshot.forEach((doc) => {
                const chatData = doc.data();
                chatList.push({ id: doc.id, ...chatData });
            });

            setChats(chatList);
        };

        fetchChats();
    }, [user.uid]);

    return (
        <div className="chat-list">
            <h2>Your Chats</h2>
            {chats.length === 0 ? (
                <p>No chats available.</p>
            ) : (
                chats.map((chat) => {
                    const otherUserId = chat.participants.find((id) => id !== user.uid);
                    const otherUser = chat.participantsInfo[otherUserId]; // Взимаме username от participantsInfo

                    return (
                        <Link to={`/chat/${otherUser.id}`} key={otherUser.id}>
                            <div className="chat-item">
                                <span>Chat with {otherUser.username}</span>
                            </div>
                        </Link>
                    );
                })
            )}
        </div>
    );
};

export default ChatList;
