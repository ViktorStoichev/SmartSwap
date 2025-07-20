// Profile component for displaying user information and phone listings

import React, { useMemo } from 'react';
import './Profile.css';
import { useParams } from 'react-router-dom';
import UseProfile from '../../../hook-api/auth-hooks/UseProfile';
import Loader from '../../main/loader/Loader';
import PhoneTemplate from '../../items/phone-template/PhoneTemplate';

const Profile = () => {
    // Extract user ID from URL parameters
    const { id } = useParams();
    
    // Get user data and posts from custom hook
    const { user, pendingPosts, approvedPosts, loading } = UseProfile(id);

    // Memoize the rendered pending posts
    const renderedPendingPosts = useMemo(() => (
        pendingPosts.map(post => (
            <div key={post.id} className="phone-card pending">
                <PhoneTemplate phone={post} />
                <div className="pending-badge">Pending Approval</div>
            </div>
        ))
    ), [pendingPosts]);

    // Memoize the rendered approved posts
    const renderedApprovedPosts = useMemo(() => (
        approvedPosts.map(post => (
            <PhoneTemplate key={post.id} phone={post} />
        ))
    ), [approvedPosts]);

    // Show loading spinner while fetching data
    if (loading || !user) return <Loader />;

    return (
        <div className="profile-container">
            {/* Profile page header section */}
            <div className="profile-header">
                <h2 className="profile-title">User Profile</h2>
            </div>

            {/* User profile information section with avatar */}
            <div className="profile-content">
                {/* User details including username, email, and location */}
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
                {/* User avatar image display */}
                <div className="profile-avatar">
                    <img src={user.avatarUrl} alt={`${user.username}'s avatar`} />
                </div>
            </div>

            {/* Pending phone listings section - only shown if there are pending posts */}
            {pendingPosts.length > 0 && (
                <div className="user-posts pending-posts">
                    {/* Pending posts header with count */}
                    <div className="posts-header">
                        <h3 className="posts-title">Pending Listings</h3>
                        <p className="posts-subtitle">
                            {pendingPosts.length} phone{pendingPosts.length === 1 ? '' : 's'} waiting for approval
                        </p>
                    </div>
                    {/* Grid of pending phone cards with approval badges */}
                    <div className="posts-grid">
                        {renderedPendingPosts}
                    </div>
                </div>
            )}

            {/* Approved phone listings section */}
            <div className="user-posts">
                {/* Approved posts header with dynamic count */}
                <div className="posts-header">
                    <h3 className="posts-title">Approved Listings</h3>
                    <p className="posts-subtitle">
                        {approvedPosts.length > 0 
                            ? `${approvedPosts.length} approved phone${approvedPosts.length === 1 ? '' : 's'}`
                            : "No approved phones yet"}
                    </p>
                </div>

                {/* Render approved posts grid or empty state message */}
                {approvedPosts.length > 0 ? (
                    <div className="posts-grid">
                        {renderedApprovedPosts}
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
