import './Profile.css';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserData } from '../../../services/getUserProfile';
import Loader from '../../main/loader/Loader';
import { getUserPhones } from '../../../services/getUserPhones';

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

            <div className="user-posts">
                <h3>{user.username}'s Posts</h3>
                {userPosts.length > 0 ? (
                    <ul className="post-list">
                        {userPosts.map(post => (
                            <Link to={`/phones/${post.id}`} key={post.id} className="post-item">
                                <img src={post.imageUrl} alt={post.title} className="post-image" />
                                <div className="post-content">
                                    <h4>{post.title}</h4>
                                    <p>{post.price} USD</p>
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
