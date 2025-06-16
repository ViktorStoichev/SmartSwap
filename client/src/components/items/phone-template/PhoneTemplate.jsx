import { Link } from "react-router-dom";
import './PhoneTemplate.css';

export default function PhoneTemplate({ phone }) {
    return (
        <Link className="product-card" to={`/phones/${phone.id}`}>
            <div className="image-wrapper">
                <img src={phone.imageUrl} alt={phone.model} className="product-image" />
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