import { Link } from "react-router-dom";
import './PhoneTemplate.css';

export default function PhoneTemplate({ phone }) {
    let imageUrl = null;

    if (phone.images) {
        let parsedImages = [];
        if (typeof phone.images === "string") {
            try {
                parsedImages = JSON.parse(phone.images);
            } catch {
                parsedImages = [];
            }
        } else if (Array.isArray(phone.images)) {
            parsedImages = phone.images;
        }
        imageUrl = parsedImages && Array.isArray(parsedImages) && parsedImages.length > 0 ? parsedImages[0].url : null;
    }

    // Use a placeholder image if no images are available
    const displayImage = imageUrl || null;

    return (
        <Link className="product-card" to={`/phones/${phone.id}`}>
            <div className="image-wrapper">
                <img src={displayImage} alt={phone.model} className="product-image" />
            </div>
            <div className="product-info">
                <h2 className="product-name">{phone.brand} {phone.model}</h2>
                <p className="product-specs">{phone.color} • {phone.memory} • {phone.quality}</p>
                <div className="product-details">
                    <p className="delivery-info">Delivery: <span>1 - 2 working days</span></p>
                    <p className="product-price">${Number(phone.price).toFixed(2)}</p>
                </div>
            </div>
        </Link>
    );
}