import { useNavigate, useParams } from "react-router-dom";
import { useEdit } from "../../../hook-api/UseEdit";
import "./EditPhone.css";
import { useErrorHandler } from "../../../errors/handleError";
import { useState } from "react";
import ConfirmModal from "../../main/confirm-modal/ConfirmModal";

export default function EditPhone() {
    const { id } = useParams();
    const { editedProduct, handleEditChange, handleEditSubmit } = useEdit();
    const { errors, visibleErrors, handlePhoneDataError } = useErrorHandler();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

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
                <form onSubmit={onFormSubmit} className="edit-product-form">
                    <label>Title:</label>
                    <input type="text" name="title" value={editedProduct.title} onChange={handleEditChange} required onBlur={handlePhoneDataError} />
                    {errors.title && <span className={`error-text ${visibleErrors.title ? "show" : ""}`}>{errors.title}</span>}

                    <label>Image URL:</label>
                    <input type="text" name="imageUrl" value={editedProduct.imageUrl} onChange={handleEditChange} required onBlur={handlePhoneDataError} />
                    {errors.imageUrl && <span className={`error-text ${visibleErrors.imageUrl ? "show" : ""}`}>{errors.imageUrl}</span>}

                    <label>Price:</label>
                    <input type="number" name="price" value={editedProduct.price} onChange={handleEditChange} required onBlur={handlePhoneDataError} />
                    {errors.price && <span className={`error-text ${visibleErrors.price ? "show" : ""}`}>{errors.price}</span>}

                    <label>Description:</label>
                    <textarea name="description" value={editedProduct.description} onChange={handleEditChange} required onBlur={handlePhoneDataError} ></textarea>
                    {errors.description && <span className={`error-text ${visibleErrors.description ? "show" : ""}`}>{errors.description}</span>}

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