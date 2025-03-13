import './Profile.css';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../../services/firebase';
import { useAuth } from '../../../contexts/AuthContext';

const Profile = () => {
    const { user } = useAuth();

    if (!user) return <div>There is no user. Loading...</div>;

    return (
        <section className='profile'>
            <h2>Profile</h2>
            <article>
                <div className="user-data">
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Address:</strong> {user.address}</p>
                </div>
                <div className="user-image">
                    <img src={user.avatarUrl} alt="Avatar" />
                </div>
            </article>
        </section>
    );
};

export default Profile;
