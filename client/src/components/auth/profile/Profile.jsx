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
    const [pendingPosts, setPendingPosts] = useState([]);
    const [approvedPosts, setApprovedPosts] = useState([]);

    useEffect(() => {
        let isMounted = true;

        const fetchProfile = async () => {
            const data = await getUserData(id);
            if (isMounted) setUser(data);
        };

        const fetchUserPosts = async () => {     
            const posts = await getUserPhones(id);
            if (isMounted) {
                setUserPosts(posts);
                setPendingPosts(posts.filter(post => post.pending));
                setApprovedPosts(posts.filter(post => !post.pending));
            }
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

            {pendingPosts.length > 0 && (
                <div className="user-posts pending-posts">
                    <div className="posts-header">
                        <h3 className="posts-title">Pending Listings</h3>
                        <p className="posts-subtitle">
                            {pendingPosts.length} phone{pendingPosts.length === 1 ? '' : 's'} waiting for approval
                        </p>
                    </div>
                    <div className="posts-grid">
                        {pendingPosts.map(post => (
                            <div key={post.id} className="phone-card pending">
                                <PhoneTemplate phone={post} />
                                <div className="pending-badge">Pending Approval</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="user-posts">
                <div className="posts-header">
                    <h3 className="posts-title">Approved Listings</h3>
                    <p className="posts-subtitle">
                        {approvedPosts.length > 0 
                            ? `${approvedPosts.length} approved phone${approvedPosts.length === 1 ? '' : 's'}`
                            : "No approved phones yet"}
                    </p>
                </div>

                {approvedPosts.length > 0 ? (
                    <div className="posts-grid">
                        {approvedPosts.map(post => (
                            <PhoneTemplate key={post.id} phone={post} />
                        ))}
                    </div>
                ) : (
                    <div className="no-posts">
                        <i className="fa-solid fa-mobile-screen"></i>
                        <h3>No Approved Listings</h3>
                        <p>This user hasn't had any phone listings approved yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
