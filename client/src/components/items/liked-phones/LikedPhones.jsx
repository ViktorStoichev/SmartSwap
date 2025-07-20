// LikedPhones component for displaying user's favorite phone listings

import React, { useMemo } from "react";
import "./LikedPhones.css";
import { useAuth } from "../../../contexts/AuthContext";
import { usePhones } from "../../../hook-api/phones-hooks/UsePhones";
import PhoneTemplate from "../phone-template/PhoneTemplate";
import { useNavigate } from "react-router-dom";
import Loader from "../../main/loader/Loader";

function LikedPhones() {
    // Get current user from authentication context
    const { user } = useAuth();
    
    // Get user's liked phones and loading state from the phones hook
    const { likedPhones, isLoading } = usePhones(user);
    
    // React Router navigation hook for redirecting to catalog
    const navigate = useNavigate();

    // Memoize rendered liked phones
    const renderedLikedPhones = useMemo(() =>
        likedPhones.map(phone => (
            <PhoneTemplate key={phone._id} phone={phone} />
        )),
        [likedPhones]
    );

    // Show loading spinner while fetching liked phones data
    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="liked-phones-container">
            {/* Header section with title and subtitle */}
            <div className="liked-phones-header">
                <h2 className="liked-phones-title">Your Favorite Phones</h2>
                <p className="liked-phones-subtitle">
                    {likedPhones.length > 0 
                        ? `You have ${likedPhones.length} phone${likedPhones.length === 1 ? '' : 's'} in your favorites`
                        : "Start building your collection of favorite phones"}
                </p>
            </div>

            {/* Grid of liked phones or empty state */}
            {likedPhones.length > 0 ? (
                <div className="liked-phones-grid">
                    {renderedLikedPhones}
                </div>
            ) : (
                <div className="empty-state">
                    <i className="fa-solid fa-heart-crack"></i>
                    <h3>No Favorites Yet</h3>
                    <p>Browse our catalog and add phones to your favorites!</p>
                    <button className="browse-button" onClick={() => navigate("/phones")}>
                        Browse Phones
                    </button>
                </div>
            )}
        </div>
    );
}

export default React.memo(LikedPhones);
