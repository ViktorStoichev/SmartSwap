import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../../services/firebase";
import formatDate from "../../../utils/formatDate";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

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
                <input
                    type="text"
                    name="title"
                    className="input-field"
                    placeholder="Title"
                />
                <input
                    type="text"
                    name="imageUrl"
                    className="input-field"
                    placeholder="Image URL"
                />
                <input
                    type="text"
                    name="price"
                    className="input-field"
                    placeholder="Price"
                />
                <input
                    type="text"
                    name="description"
                    className="input-field"
                    placeholder="Description"
                />
                <button type="submit" className="submit-button">Submit</button>
            </form>
        </div>
    );
}