import "./LikedPhones.css";
import { useAuth } from "../../../contexts/AuthContext";
import { usePhones } from "../../../hook-api/UsePhones";
import PhoneTemplate from "../phone-template/PhoneTemplate";

export default function LikedPhones() {
    const { user } = useAuth();
    const { likedPhones } = usePhones(user);

    return (
        <div className="products-container">
            <h2 className="products-title">LIKED PHONES</h2>
            {likedPhones.length < 1 && <p>There are no liked phones!</p>}
            <div className="products-grid">
                {
                    likedPhones.map((item) => <PhoneTemplate phone={item} key={item._id} />)}
            </div>
        </div>
    );
};
