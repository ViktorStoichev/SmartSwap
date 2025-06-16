import './Profile.css';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserData } from '../../../services/getUserProfile';
import Loader from '../../main/loader/Loader';
import { getUserPhones } from '../../../services/getUserPhones';
import PhoneTemplate from '../../items/phone-template/PhoneTemplate';

const Profile = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        let isMounted = true;

        const fetchProfile = async () => {
            const data = await getUserData(id);
            if (isMounted) setUser(data);
        };

        const fetchUserPosts = async () => {     
            const posts = await getUserPhones(id);
            if (isMounted) setUserPosts(posts);
        };

        if (id) {
            fetchProfile();
            fetchUserPosts();
        }

        return () => {
            isMounted = false;
        }
    }, [id]);

    if (!user) return <Loader />;

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h2 className="profile-title">User Profile</h2>
            </div>

            <div className="profile-content">
                <div className="profile-info">
                    <div className="info-item">
                        <i className="fa-solid fa-user"></i>
                        <p><strong>Username:</strong> {user.username}</p>
                    </div>
                    <div className="info-item">
                        <i className="fa-solid fa-envelope"></i>
                        <p><strong>Email:</strong> {user.email}</p>
                    </div>
                    <div className="info-item">
                        <i className="fa-solid fa-location-dot"></i>
                        <p><strong>Location:</strong> {user.address}</p>
                    </div>
                </div>
                <div className="profile-avatar">
                    <img src={user.avatarUrl} alt={`${user.username}'s avatar`} />
                </div>
            </div>

            <div className="user-posts">
                <div className="posts-header">
                    <h3 className="posts-title">{user.username}'s Listings</h3>
                    <p className="posts-subtitle">
                        {userPosts.length > 0 
                            ? `Currently has ${userPosts.length} phone${userPosts.length === 1 ? '' : 's'} listed`
                            : "No phones listed yet"}
                    </p>
                </div>

                {userPosts.length > 0 ? (
                    <div className="posts-grid">
                        {userPosts.map(post => (
                            <PhoneTemplate key={post.id} phone={post} />
                        ))}
                    </div>
                ) : (
                    <div className="no-posts">
                        <i className="fa-solid fa-mobile-screen"></i>
                        <h3>No Listings Yet</h3>
                        <p>This user hasn't listed any phones for sale yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
