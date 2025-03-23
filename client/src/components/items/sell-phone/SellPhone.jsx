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
                <form className="sell-phone-form" onSubmit={onFormSubmit}>
                    <label>Title:</label>
                    <input type="text" name="title" required onBlur={handlePhoneDataError} />
                    {errors.title && <span className={`error-text ${visibleErrors.title ? "show" : ""}`}>{errors.title}</span>}

                    <label>Image URL:</label>
                    <input type="text" name="imageUrl" required onBlur={handlePhoneDataError} />
                    {errors.imageUrl && <span className={`error-text ${visibleErrors.imageUrl ? "show" : ""}`}>{errors.imageUrl}</span>}

                    <label>Price:</label>
                    <input type="number" name="price" required onBlur={handlePhoneDataError} />
                    {errors.price && <span className={`error-text ${visibleErrors.price ? "show" : ""}`}>{errors.price}</span>}

                    <label>Description:</label>
                    <textarea name="description" required onBlur={handlePhoneDataError}></textarea>
                    {errors.description && <span className={`error-text ${visibleErrors.description ? "show" : ""}`}>{errors.description}</span>}

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
