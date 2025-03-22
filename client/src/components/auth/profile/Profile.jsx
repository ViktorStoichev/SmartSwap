import './Profile.css';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserData } from '../../../services/getUserProfile';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../../server/firebase';
import Loader from '../../main/loader/Loader';

const Profile = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        const fetchProfile = async () => {
            const data = await getUserData(id);
            setUser(data);
        };

        const fetchUserPosts = async () => {
            const postsRef = collection(db, "items");
            const q = query(postsRef, where("ownerId", "==", id));
            const querySnapshot = await getDocs(q);
            
            const posts = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setUserPosts(posts);
        };

        if (id) {
            fetchProfile();
            fetchUserPosts();
        }
    }, [id]);

    if (!user) return <Loader />;

    return (
        <section className='profile'>
            <h2>Profile</h2>
            <article>
                <div className="user-data">
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Location:</strong> {user.address}</p>
                </div>
                <div className="user-image">
                    <img src={user.avatarUrl} alt="Avatar" />
                </div>
            </article>

            {/* 🔥 Секция за публикуваните постове */}
            <div className="user-posts">
                <h3>{user.username}'s Posts</h3>
                {userPosts.length > 0 ? (
                    <ul className="post-list">
                        {userPosts.map(post => (
                            <Link to={`/phones/${post.id}`} key={post.id} className="post-item">
                                <img src={post.imageUrl} alt={post.title} className="post-image" />
                                <div className="post-content">
                                    <h4>{post.title}</h4>
                                    <p>{post.description}</p>
                                </div>
                            </Link>
                        ))}
                    </ul>
                ) : (
                    <p className="no-posts">No posts found.</p>
                )}
            </div>
        </section>
    );
};

export default Profile;
