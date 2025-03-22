import { useErrorHandler } from "../../../errors/handleError";
import { useCreate } from "../../../hook-api/UseCreate";
import { useState } from "react";
import "./SellPhone.css";

export default function AddItem() {
    const { errors, visibleErrors, handlePhoneDataError } = useErrorHandler();
    const { createAction } = useCreate();

    return (
        <div className="sell-phone-container">
            <h2 className="sell-phone-title">Sell Phone</h2>
            <form className="sell-phone-form" action={createAction}>
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
    );
}
