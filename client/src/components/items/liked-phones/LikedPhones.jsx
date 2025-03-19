import "./LikedPhones.css";
import { Link } from "react-router-dom";
import Loader from "../../loader/Loader";
import { useAuth } from "../../../contexts/AuthContext";
import { usePhones } from "../../../hook-api/UsePhones";

export default function LikedPhones() {
    const { user } = useAuth();
    const { likedPhones } = usePhones(user);

    if (likedPhones.length < 1) return <Loader />;

    return (
        <div className="products-container">
            <h2 className="products-title">LIKED PHONES</h2>
            <div className="products-grid">
                {
                    likedPhones.map((item) => (
                        <Link key={item.id} className="product-card" to={`/items/${item.id}`}>
                            <div className="image-wrapper">
                                <img src={item.imageUrl} alt={item.title} className="product-image" />
                            </div>
                            <h2 className="product-name">{item.title}</h2>
                            <p className="product-price">${item.price}</p>
                        </Link>
                    ))}
            </div>
        </div>
    );
};
