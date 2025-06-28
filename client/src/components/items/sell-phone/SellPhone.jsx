// SellPhone component - Allows users to list their phones for sale
// Handles form submission, image upload, and validation

import { useErrorHandler } from "../../../errors/handleError";
import { useCreate } from "../../../hook-api/sell-hooks/UseCreate";
import { useSellImageManager } from "../../../hook-api/sell-hooks/UseSellImageManager";
import { useSellForm } from "../../../hook-api/sell-hooks/UseSellForm";
import { useEffect } from "react";
import "./SellPhone.css";
import ConfirmModal from "../../main/confirm-modal/ConfirmModal";
import Loader from "../../main/loader/Loader";

export default function AddItem() {
    // Error handling and validation hooks
    const { errors, visibleErrors, handlePhoneDataError, handleImagesError } = useErrorHandler();
    const { createAction, isCreating } = useCreate();
    
    // Image management functionality from custom hook
    const {
        images,
        pendingImages,
        uploading,
        uploadError,
        handleImageChange,
        handleRemoveImage,
        uploadPendingImages,
        getAllImages
    } = useSellImageManager();
    
    // Form handling functionality from custom hook
    const {
        isModalOpen,
        isSubmitting,
        handleInputChange,
        onFormSubmit,
        handleConfirm,
        closeModal
    } = useSellForm();

    // Check if any loading state is active
    const isLoading = isCreating || isSubmitting || uploading;

    // Validate images whenever they change
    useEffect(() => {
        handleImagesError(getAllImages());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [images, pendingImages]);

    // Show loader if any loading state is active
    if (isLoading) {
        return (
            <div className="sell-phone-container">
                <div className="loading-container">
                    <Loader />
                    <p className="loading-text">
                        {isCreating ? "Creating your listing..." : 
                         isSubmitting ? "Uploading images and creating listing..." :
                         uploading ? "Uploading images..." : "Processing..."}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* Confirmation modal for form submission */}
            <ConfirmModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={() => handleConfirm(uploadPendingImages, createAction)}
                title={"Confirm Selling this Phone"}
                message={"Are you sure you want to sell this phone?"}
            />
            
            {/* Main form container */}
            <div className="sell-phone-container">
                <h2 className="sell-phone-title">Sell Phone</h2>
                <p className="sell-phone-subtitle">List your phone for sale in our marketplace</p>
                
                {/* Phone listing form */}
                <form className="sell-phone-form" onSubmit={(e) => onFormSubmit(e, images)}>
                    <div className="form-columns-container">
                        {/* Left column - Basic phone details */}
                        <div className="form-column">
                            <div className="input-group">
                                <label>Brand:</label>
                                <select name="brand" required onBlur={handlePhoneDataError} onChange={handleInputChange}>
                                    <option value="">Select Brand</option>
                                    <option value="Apple">Apple</option>
                                    <option value="Samsung">Samsung</option>
                                    <option value="Motorola">Motorola</option>
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
                                <label>Color:</label>
                                <select name="color" required onBlur={handlePhoneDataError} onChange={handleInputChange}>
                                    <option value="">Select Color</option>
                                    <option value="Black">Black</option>
                                    <option value="White">White</option>
                                    <option value="Silver">Silver</option>
                                    <option value="Gold">Gold</option>
                                    <option value="Pink">Pink</option>
                                    <option value="Purple">Purple</option>
                                    <option value="Blue">Blue</option>
                                    <option value="Red">Red</option>
                                    <option value="Green">Green</option>
                                    <option value="Other">Other</option>
                                </select>
                                {errors.color && <span className={`error-text ${visibleErrors.color ? "show" : ""}`}>{errors.color}</span>}
                            </div>
                            <div className="input-group">
                                <label>Quality:</label>
                                <select name="quality" required onBlur={handlePhoneDataError} onChange={handleInputChange}>
                                    <option value="">Select Quality</option>
                                    <option value="Used - Like New">Used - Like New</option>
                                    <option value="Used - Good">Used - Good</option>
                                    <option value="Used - Fair">Used - Fair</option>
                                    <option value="Used - Poor">Used - Poor</option>
                                </select>
                                {errors.quality && <span className={`error-text ${visibleErrors.quality ? "show" : ""}`}>{errors.quality}</span>}
                            </div>
                            <div className="input-group">
                                <label>Price:</label>
                                <input type="number" name="price" required onBlur={handlePhoneDataError} onChange={handleInputChange} />
                                {errors.price && <span className={`error-text ${visibleErrors.price ? "show" : ""}`}>{errors.price}</span>}
                            </div>
                        </div>
                        
                        {/* Right column - Additional details and images */}
                        <div className="form-column">
                            <div className="input-group">
                                <label>Model:</label>
                                <input type="text" name="model" required onBlur={handlePhoneDataError} onChange={handleInputChange} />
                                {errors.model && <span className={`error-text ${visibleErrors.model ? "show" : ""}`}>{errors.model}</span>}
                            </div>
                            <div className="input-group">
                                <label>Memory:</label>
                                <select name="memory" required onBlur={handlePhoneDataError} onChange={handleInputChange}>
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
                                <label>Images (up to 7):</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageChange}
                                    /* onBlur removed, validation is now in useEffect */
                                    disabled={images.length + pendingImages.length >= 7 || uploading}
                                />
                                {errors.images && <span className={`error-text ${visibleErrors.images ? "show" : ""}`}>{errors.images}</span>}
                                {uploadError && <span className="error-text show">{uploadError}</span>}
                                
                                {/* Image preview section */}
                                <div className="image-preview-list">
                                    {/* Display uploaded images */}
                                    {images.map((img, idx) => (
                                        <div key={img.url} className="image-preview-item">
                                            <img src={img.url} alt={`Preview ${idx + 1}`} style={{ width: 80, height: 80, objectFit: 'cover' }} />
                                            <button type="button" onClick={() => handleRemoveImage(idx, false)} disabled={uploading}>Remove</button>
                                        </div>
                                    ))}
                                    {/* Display pending images */}
                                    {pendingImages.map((file, idx) => (
                                        <div key={file.name + idx} className="image-preview-item">
                                            <img src={URL.createObjectURL(file)} alt={`Preview pending ${idx + 1}`} style={{ width: 80, height: 80, objectFit: 'cover' }} />
                                            <button type="button" onClick={() => handleRemoveImage(idx, true)} disabled={uploading}>Remove</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="input-group">
                                <label>Description:</label>
                                <textarea name="description" required onBlur={handlePhoneDataError} onChange={handleInputChange}></textarea>
                                {errors.description && <span className={`error-text ${visibleErrors.description ? "show" : ""}`}>{errors.description}</span>}
                            </div>
                        </div>
                    </div>
                    
                    {/* Form submission button */}
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
