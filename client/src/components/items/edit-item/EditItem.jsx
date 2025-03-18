import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../../../server/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "../../../contexts/AuthContext";
import "./EditItem.css";

export default function EditItem() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [editedProduct, setEditedProduct] = useState({
        title: "",
        description: "",
        price: "",
        imageUrl: "",
    });

    useEffect(() => {

        const fetchProduct = async () => {
            if(!user) {
                return<h1>Loading user...</h1>
            }
            const docRef = doc(db, "items", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                if (data.owner !== user.uid) {
                    navigate(`/details/${id}`);
                    return;
                }
                setEditedProduct({
                    title: data.title,
                    description: data.description,
                    price: data.price,
                    imageUrl: data.imageUrl,
                });
            } else {
                navigate("/");
            }
        };
        fetchProduct();
    }, [id, navigate, user]);

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const productRef = doc(db, "items", id);
        await updateDoc(productRef, {
            title: editedProduct.title,
            description: editedProduct.description,
            price: editedProduct.price,
            imageUrl: editedProduct.imageUrl,
        });
        navigate(`/items/${id}`);
    };

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