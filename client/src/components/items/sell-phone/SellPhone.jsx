import { useErrorHandler } from "../../../errors/handleError";
import { useCreate } from "../../../hook-api/UseCreate";
import { useState, useEffect } from "react";
import "./SellPhone.css";
import ConfirmModal from "../../main/confirm-modal/ConfirmModal";
import { checkProfanity, showProfanityAlert } from "../../../utils/profanityCheck";
import { uploadImage, deleteImage } from "../../../services/photoService";

export default function AddItem() {
    const { errors, visibleErrors, handlePhoneDataError, handleImagesError } = useErrorHandler();
    const { createAction } = useCreate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState(null);
    const [images, setImages] = useState([]);
    const [pendingImages, setPendingImages] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState("");

    const handleInputChange = (e) => {
        const { value, name } = e.target;
        if (checkProfanity(value)) {
            showProfanityAlert();
            e.target.value = '';
        }
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

    const handleRemoveImage = (idx, isPending = false) => {
        if (isPending) {
            setPendingImages((prev) => prev.filter((_, i) => i !== idx));
        } else {
            const img = images[idx];
            setImages((prev) => prev.filter((_, i) => i !== idx));
            if (img && img.public_id) {
                try {
                    deleteImage(img.public_id);
                } catch {}
            }
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
            await createAction(formData);
            setImages(allImages);
            setPendingImages([]);
            setIsModalOpen(false);
        } catch (err) {
            setUploadError("Failed to upload image(s).");
        } finally {
            setUploading(false);
        }
    };

    useEffect(() => {
        handleImagesError([...images, ...pendingImages]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [images, pendingImages]);

    return (
        <>
            <ConfirmModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirm}
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
                                <label>Description:</label>
                                <textarea name="description" required onBlur={handlePhoneDataError} onChange={handleInputChange}></textarea>
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
