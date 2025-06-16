import "./LikedPhones.css";
import { useAuth } from "../../../contexts/AuthContext";
import { usePhones } from "../../../hook-api/UsePhones";
import PhoneTemplate from "../phone-template/PhoneTemplate";
import { useNavigate } from "react-router-dom";

export default function LikedPhones() {
    const { user } = useAuth();
    const { likedPhones } = usePhones(user);
    const navigate = useNavigate();

    return (
        <div className="liked-phones-container">
            <div className="liked-phones-header">
                <h2 className="liked-phones-title">Your Favorite Phones</h2>
                <p className="liked-phones-subtitle">
                    {likedPhones.length > 0 
                        ? `You have ${likedPhones.length} phone${likedPhones.length === 1 ? '' : 's'} in your favorites`
                        : "Start building your collection of favorite phones"}
                </p>
            </div>

            {likedPhones.length < 1 ? (
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
                <div className="liked-phones-grid">
                    {likedPhones.map((phone) => (
                        <PhoneTemplate phone={phone} key={phone._id} />
                    ))}
                </div>
            )}
        </div>
    );
};
