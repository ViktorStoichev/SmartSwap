import { useNavigate, useParams } from "react-router-dom";
import { useEdit } from "../../../hook-api/UseEdit";
import "./EditPhone.css";
import { useErrorHandler } from "../../../errors/handleError";
import { useState } from "react";
import ConfirmModal from "../../main/confirm-modal/ConfirmModal";
import { checkProfanity, showProfanityAlert } from "../../../utils/profanityCheck";

export default function EditPhone() {
    const { id } = useParams();
    const { editedProduct, handleEditChange, handleEditSubmit } = useEdit();
    const { errors, visibleErrors, handlePhoneDataError } = useErrorHandler();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { value, name } = e.target;
        if (checkProfanity(value)) {
            showProfanityAlert();
            e.target.value = '';
            return;
        }
        handleEditChange(e);
    };

    const onFormSubmit = (e) => {
        e.preventDefault();
        setIsModalOpen(true);
    }

    return (
        <>
            <ConfirmModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleEditSubmit}
                title={"Confirm Edit"}
                message={"Are you sure you want to edit this phone?"}
            />
            <div className="edit-product-container">
                <h2>Edit Phone</h2>
                <p className="edit-product-subtitle">Update your phone listing details</p>
                <form onSubmit={onFormSubmit} className="edit-product-form">
                    <div className="input-group">
                        <label>Brand:</label>
                        <select name="brand" value={editedProduct.brand} onChange={handleInputChange} required onBlur={handlePhoneDataError}>
                            <option value="">Select Brand</option>
                            <option value="Apple">Apple</option>
                            <option value="Samsung">Samsung</option>
                            <option value="Google">Google</option>
                            <option value="Xiaomi">Xiaomi</option>
                            <option value="OnePlus">OnePlus</option>
                            <option value="Huawei">Huawei</option>
                            <option value="Sony">Sony</option>
                            <option value="Other">Other</option>
                        </select>
                        {errors.brand && <span className={`error-text ${visibleErrors.brand ? "show" : ""}`}>{errors.brand}</span>}
                    </div>

                    <div className="input-group">
                        <label>Model:</label>
                        <input type="text" name="model" value={editedProduct.model} onChange={handleInputChange} required onBlur={handlePhoneDataError} />
                        {errors.model && <span className={`error-text ${visibleErrors.model ? "show" : ""}`}>{errors.model}</span>}
                    </div>

                    <div className="input-group">
                        <label>Color:</label>
                        <select name="color" value={editedProduct.color} onChange={handleInputChange} required onBlur={handlePhoneDataError}>
                            <option value="">Select Color</option>
                            <option value="Black">Black</option>
                            <option value="White">White</option>
                            <option value="Silver">Silver</option>
                            <option value="Gold">Gold</option>
                            <option value="Pink">Pink</option>
                            <option value="Blue">Blue</option>
                            <option value="Red">Red</option>
                            <option value="Green">Green</option>
                            <option value="Other">Other</option>
                        </select>
                        {errors.color && <span className={`error-text ${visibleErrors.color ? "show" : ""}`}>{errors.color}</span>}
                    </div>

                    <div className="input-group">
                        <label>Memory:</label>
                        <select name="memory" value={editedProduct.memory} onChange={handleInputChange} required onBlur={handlePhoneDataError}>
                            <option value="">Select Memory</option>
                            <option value="64GB">64GB</option>
                            <option value="128GB">128GB</option>
                            <option value="256GB">256GB</option>
                            <option value="512GB">512GB</option>
                            <option value="1TB">1TB</option>
                        </select>
                        {errors.memory && <span className={`error-text ${visibleErrors.memory ? "show" : ""}`}>{errors.memory}</span>}
                    </div>

                    <div className="input-group">
                        <label>Quality:</label>
                        <select name="quality" value={editedProduct.quality} onChange={handleInputChange} required onBlur={handlePhoneDataError}>
                            <option value="">Select Quality</option>
                            <option value="Used - Like New">Used - Like New</option>
                            <option value="Used - Good">Used - Good</option>
                            <option value="Used - Fair">Used - Fair</option>
                            <option value="Used - Poor">Used - Poor</option>
                        </select>
                        {errors.quality && <span className={`error-text ${visibleErrors.quality ? "show" : ""}`}>{errors.quality}</span>}
                    </div>

                    <div className="input-group">
                        <label>Image URL:</label>
                        <input type="text" name="imageUrl" value={editedProduct.imageUrl} onChange={handleInputChange} required onBlur={handlePhoneDataError} />
                        {errors.imageUrl && <span className={`error-text ${visibleErrors.imageUrl ? "show" : ""}`}>{errors.imageUrl}</span>}
                    </div>

                    <div className="input-group">
                        <label>Price:</label>
                        <input type="number" name="price" value={editedProduct.price} onChange={handleInputChange} required onBlur={handlePhoneDataError} />
                        {errors.price && <span className={`error-text ${visibleErrors.price ? "show" : ""}`}>{errors.price}</span>}
                    </div>

                    <div className="input-group">
                        <label>Description:</label>
                        <textarea name="description" value={editedProduct.description} onChange={handleInputChange} required onBlur={handlePhoneDataError}></textarea>
                        {errors.description && <span className={`error-text ${visibleErrors.description ? "show" : ""}`}>{errors.description}</span>}
                    </div>

                    <div className="edit-actions">
                        <button type="submit" className="save-btn" style={{ backgroundColor: Object.values(errors).some(Boolean) ? "grey" : "" }}
                            disabled={Object.values(errors).some(Boolean)}>Save Changes</button>
                        <button type="button" className="cancel-btn" onClick={() => navigate(`/phones/${id}`)}>Cancel</button>
                    </div>
                </form>
            </div>
        </>
    );
}