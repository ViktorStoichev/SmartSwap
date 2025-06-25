import { useNavigate, useParams } from "react-router-dom";
import { useEdit } from "../../../hook-api/UseEdit";
import "./EditPhone.css";
import { useErrorHandler } from "../../../errors/handleError";
import { useState, useEffect } from "react";
import ConfirmModal from "../../main/confirm-modal/ConfirmModal";
import { checkProfanity, showProfanityAlert } from "../../../utils/profanityCheck";
import { uploadImage, deleteImage } from "../../../services/photoService";

export default function EditPhone() {
    const { id } = useParams();
    const { editedProduct, handleEditChange, handleEditSubmit } = useEdit();
    const { errors, visibleErrors, handlePhoneDataError } = useErrorHandler();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const [images, setImages] = useState([]); // Start empty, will be set in useEffect
    const [pendingImages, setPendingImages] = useState([]); // NEW: holds File objects
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState("");
    const [originalImages, setOriginalImages] = useState([]);
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        if (editedProduct.images && Array.isArray(editedProduct.images)) {
            setOriginalImages(editedProduct.images);
            setImages(editedProduct.images); // Set current images for display
        }
    }, [editedProduct.images]);

    const handleInputChange = (e) => {
        const { value, name } = e.target;
        if (checkProfanity(value)) {
            showProfanityAlert();
            e.target.value = '';
            return;
        }
        handleEditChange(e);
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length + images.length + pendingImages.length > 7) {
            setUploadError("You can upload up to 7 images.");
            return;
        }
        setUploadError("");
        setPendingImages((prev) => [...prev, ...files].slice(0, 7 - images.length));
    };

    const handleRemoveImage = async (idx, isPending = false) => {
        if (isPending) {
            setPendingImages((prev) => prev.filter((_, i) => i !== idx));
        } else {
            setImages((prev) => prev.filter((_, i) => i !== idx));
        }
    };

    const onFormSubmit = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        form.append("images", JSON.stringify(images));
        setFormData(form);
        setIsModalOpen(true);
    };

    const handleConfirm = async () => {
        if (!formData) return;
        setUploading(true);
        setUploadError("");
        try {
            // Upload all pending images
            const uploaded = [];
            for (const file of pendingImages) {
                const data = await uploadImage(file);
                uploaded.push(data);
            }
            const allImages = [...images, ...uploaded];
            formData.set("images", JSON.stringify(allImages));
            await handleEditSubmit(allImages);
            // Delete removed images from Cloudinary
            const removedImages = originalImages.filter(
                orig => !allImages.some(img => img.public_id === orig.public_id)
            );
            for (const img of removedImages) {
                if (img.public_id) {
                    try {
                        await deleteImage(img.public_id);
                    } catch {}
                }
            }
            setImages(allImages); // update images state
            setPendingImages([]); // clear pending
            setOriginalImages(allImages); // update for next edit
            setIsModalOpen(false);
        } catch (err) {
            setUploadError("Failed to upload image(s).");
        } finally {
            setUploading(false);
        }
    };

    return (
        <>
            <ConfirmModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirm}
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
                            <option value="Purple">Purple</option>
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
                        <label>Images (up to 7):</label>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            disabled={images.length >= 7 || uploading}
                        />
                        {uploadError && <span className="error-text show">{uploadError}</span>}
                        <div className="image-preview-list">
                            {images.map((img, idx) => (
                                <div key={img.url} className="image-preview-item">
                                    <img src={img.url} alt={`Preview ${idx + 1}`} style={{ width: 80, height: 80, objectFit: 'cover' }} />
                                    <button type="button" onClick={() => handleRemoveImage(idx, false)} disabled={uploading}>Remove</button>
                                </div>
                            ))}
                            {pendingImages.map((file, idx) => (
                                <div key={file.name + idx} className="image-preview-item">
                                    <img src={URL.createObjectURL(file)} alt={`Preview pending ${idx + 1}`} style={{ width: 80, height: 80, objectFit: 'cover' }} />
                                    <button type="button" onClick={() => handleRemoveImage(idx, true)} disabled={uploading}>Remove</button>
                                </div>
                            ))}
                        </div>
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