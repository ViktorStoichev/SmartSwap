import { Link } from "react-router-dom";

export default function PhoneTemplate({ phone }) {
    return (
        <Link className="product-card" to={`/phones/${phone.id}`}>
            <div className="image-wrapper">
                <img src={phone.imageUrl} alt={phone.title} className="product-image" />
            </div>
            <h2 className="product-name">{phone.title}</h2>
            <p className="product-price">${phone.price}</p>
        </Link>
    );
}