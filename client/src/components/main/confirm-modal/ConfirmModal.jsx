// Confirmation Modal Component
// Reusable modal for confirming user actions with customizable title and message

import React from "react";
import './ConfirmModal.css';

function ConfirmModal({ isOpen, onClose, onConfirm, title, message }) {
    // Early return if modal is not open - no rendering
    if (!isOpen) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal-container">
                {/* Modal title - customizable through props */}
                <h3 className="modal-title">{title}</h3>
                
                {/* Modal message - customizable through props */}
                <p className="modal-message">{message}</p>
                
                {/* Action buttons container */}
                <div className="modal-actions">
                    {/* Confirm button - triggers the confirmation action */}
                    <button className="confirm-button" onClick={onConfirm}>Confirm</button>
                    
                    {/* Cancel button - closes the modal */}
                    <button className="cancel-button" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default React.memo(ConfirmModal);