import './ConfirmModal.css';

export default function ConfirmModal({ isOpen, onClose, onConfirm, title, message }) {
    if (!isOpen) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal-container">
                <h3 className="modal-title">{title}</h3>
                <p className="modal-message">{message}</p>
                <div className="modal-actions">
                    <button className="confirm-button" onClick={onConfirm}>Confirm</button>
                    <button className="cancel-button" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
}