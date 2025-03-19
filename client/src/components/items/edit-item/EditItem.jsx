import { useParams } from "react-router-dom";
import { useEdit } from "../../../hook-api/UseEdit";
import "./EditItem.css";

export default function EditItem() {
    const { id } = useParams();
    const { editedProduct, handleEditChange, handleEditSubmit } = useEdit();

    return (
        <div className="edit-product-container">
            <h2>Edit Product</h2>
            <form onSubmit={handleEditSubmit} className="edit-product-form">
                <label>Title:</label>
                <input type="text" name="title" value={editedProduct.title} onChange={handleEditChange} required />

                <label>Description:</label>
                <textarea name="description" value={editedProduct.description} onChange={handleEditChange} required></textarea>

                <label>Price:</label>
                <input type="number" name="price" value={editedProduct.price} onChange={handleEditChange} required />
                
                <label>Image URL:</label>
                <input type="text" name="imageUrl" value={editedProduct.imageUrl} onChange={handleEditChange} required />
                
                <div className="edit-actions">
                    <button type="submit" className="save-btn">Save Changes</button>
                    <button type="button" className="cancel-btn" onClick={() => navigate(`/items/${id}`)}>Cancel</button>
                </div>
            </form>
        </div>
    );
}