// PhoneTemplate component for displaying individual phone cards in grids and lists

import React from "react";
import { Link } from "react-router-dom";
import './PhoneTemplate.css';

function PhoneTemplate({ phone }) {
    // Initialize image URL variable
    let imageUrl = null;

    // Parse and extract the first image from phone.images
    if (phone.images) {
        let parsedImages = [];
        
        // Handle string format (JSON)
        if (typeof phone.images === "string") {
            try {
                parsedImages = JSON.parse(phone.images);
            } catch {
                parsedImages = [];
            }
        } 
        // Handle array format
        else if (Array.isArray(phone.images)) {
            parsedImages = phone.images;
        }
        
        // Extract the first image URL if available
        imageUrl = parsedImages && Array.isArray(parsedImages) && parsedImages.length > 0 
            ? parsedImages[0].url 
            : null;
    }

    // Use a placeholder image if no images are available
    const displayImage = imageUrl || null;

    return (
        <Link className="product-card" to={`/phones/${phone.id}`}>
            {/* Product image section */}
            <div className="image-wrapper">
                <img src={displayImage} alt={phone.model} className="product-image" />
            </div>
            
            {/* Product information section */}
            <div className="product-info">
                {/* Product title */}
                <h2 className="product-name">{phone.brand} {phone.model}</h2>
                
                {/* Product specifications */}
                <p className="product-specs">{phone.color} • {phone.memory} • {phone.quality}</p>
                
                {/* Product details and pricing */}
                <div className="product-details">
                    <p className="delivery-info">Delivery: <span>1 - 2 working days</span></p>
                    <p className="product-price">${Number(phone.price).toFixed(2)}</p>
                </div>
            </div>
        </Link>
    );
}

export default React.memo(PhoneTemplate);