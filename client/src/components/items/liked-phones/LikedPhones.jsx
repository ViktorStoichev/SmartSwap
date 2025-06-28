// LikedPhones component for displaying user's favorite phone listings

import "./LikedPhones.css";
import { useAuth } from "../../../contexts/AuthContext";
import { usePhones } from "../../../hook-api/phones-hooks/UsePhones";
import PhoneTemplate from "../phone-template/PhoneTemplate";
import { useNavigate } from "react-router-dom";
import Loader from "../../main/loader/Loader";

export default function LikedPhones() {
    // Get current user from authentication context
    const { user } = useAuth();
    
    // Get user's liked phones and loading state from the phones hook
    const { likedPhones, isLoading } = usePhones(user);
    
    // React Router navigation hook for redirecting to catalog
    const navigate = useNavigate();

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

            {/* Conditional rendering based on whether user has liked phones */}
            {likedPhones.length < 1 ? (
                /* Empty state when no phones are liked */
                <div className="empty-state">
                    <i className="fa-solid fa-heart"></i>
                    <h3>No Favorites Yet</h3>
                    <p>Browse our catalog and add phones to your favorites to keep track of the ones you love!</p>
                    <button 
                        className="browse-button"
                        onClick={() => navigate("/phones")}
                    >
                        Browse Phones
                    </button>
                </div>
            ) : (
                /* Grid display of liked phones */
                <div className="liked-phones-grid">
                    {likedPhones.map((phone) => (
                        <PhoneTemplate phone={phone} key={phone._id} />
                    ))}
                </div>
            )}
        </div>
    );
};
