import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../../services/firebase";
import formatDate from "../../../utils/formatDate";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import './AddItem.css'

export default function AddItem() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const formAction = async (formData) => {
        const itemData = Object.fromEntries(formData);
        itemData.comments = [];
        itemData.likes = [];
        itemData.createdAt = formatDate(new Date());
        itemData.updatedAt = formatDate(new Date());
        itemData.owner = user.uid;

        try {
            const newDocRef = doc(collection(db, "items"));

            itemData._id = newDocRef.id;

            await setDoc(newDocRef, itemData);

            navigate('/items');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="register-container">
            <h2 className="register-title">Add an item</h2>
            <form className="register-form" action={formAction}>
                <label>Title:</label>
                <input
                    type="text"
                    name="title"
                />
                <label>Image URL:</label>
                <input
                    type="text"
                    name="imageUrl"
                />
                <label>Price:</label>
                <input
                    type="number"
                    name="price"
                />
                <label>Description:</label>
                <textarea
                    name="description"
                ></textarea>
                <div className="actions">
                    <button type="submit" className="submit-button">Submit</button>
                </div>
            </form>
        </div>
    );
}