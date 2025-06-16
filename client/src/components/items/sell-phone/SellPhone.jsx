import { useErrorHandler } from "../../../errors/handleError";
import { useCreate } from "../../../hook-api/UseCreate";
import { useState } from "react";
import "./SellPhone.css";
import ConfirmModal from "../../main/confirm-modal/ConfirmModal";

export default function AddItem() {
    const { errors, visibleErrors, handlePhoneDataError } = useErrorHandler();
    const { createAction } = useCreate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState(null);

    const onFormSubmit = (e) => {
        e.preventDefault();
        setFormData(new FormData(e.target));
        setIsModalOpen(true);
    }

    return (
        <>
            <ConfirmModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={() => {
                    if (formData) createAction(formData);
                    setIsModalOpen(false);
                }}
                title={"Confirm Selling this Phone"}
                message={"Are you sure you want to sell this phone?"}
            />
            <div className="sell-phone-container">
                <h2 className="sell-phone-title">Sell Phone</h2>
                <p className="sell-phone-subtitle">List your phone for sale in our marketplace</p>
                <form className="sell-phone-form" onSubmit={onFormSubmit}>
                    <div className="form-columns-container">
                        <div className="form-column">
                            <div className="input-group">
                                <label>Brand:</label>
                                <select name="brand" required onBlur={handlePhoneDataError}>
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
                                <input type="text" name="model" required onBlur={handlePhoneDataError} />
                                {errors.model && <span className={`error-text ${visibleErrors.model ? "show" : ""}`}>{errors.model}</span>}
                            </div>

                            <div className="input-group">
                                <label>Color:</label>
                                <select name="color" required onBlur={handlePhoneDataError}>
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
                                <select name="memory" required onBlur={handlePhoneDataError}>
                                    <option value="">Select Memory</option>
                                    <option value="64GB">64GB</option>
                                    <option value="128GB">128GB</option>
                                    <option value="256GB">256GB</option>
                                    <option value="512GB">512GB</option>
                                    <option value="1TB">1TB</option>
                                </select>
                                {errors.memory && <span className={`error-text ${visibleErrors.memory ? "show" : ""}`}>{errors.memory}</span>}
                            </div>
                        </div>

                        <div className="form-column">
                            <div className="input-group">
                                <label>Quality:</label>
                                <select name="quality" required onBlur={handlePhoneDataError}>
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
                                <input type="text" name="imageUrl" required onBlur={handlePhoneDataError} />
                                {errors.imageUrl && <span className={`error-text ${visibleErrors.imageUrl ? "show" : ""}`}>{errors.imageUrl}</span>}
                            </div>

                            <div className="input-group">
                                <label>Price:</label>
                                <input type="number" name="price" required onBlur={handlePhoneDataError} />
                                {errors.price && <span className={`error-text ${visibleErrors.price ? "show" : ""}`}>{errors.price}</span>}
                            </div>

                            <div className="input-group">
                                <label>Description:</label>
                                <textarea name="description" required onBlur={handlePhoneDataError}></textarea>
                                {errors.description && <span className={`error-text ${visibleErrors.description ? "show" : ""}`}>{errors.description}</span>}
                            </div>
                        </div>
                    </div>

                    <div className="actions">
                        <button
                            type="submit"
                            className="submit-button"
                            style={{ backgroundColor: Object.values(errors).some(Boolean) ? "grey" : "" }}
                            disabled={Object.values(errors).some(Boolean)}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
