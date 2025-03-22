import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../server/firebase";
import formatDate from "../utils/formatDate";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const useCreate = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const createAction = async (formData) => {
        const itemData = Object.fromEntries(formData);
        itemData.comments = [];
        itemData.likes = [];
        itemData.createdAt = formatDate(new Date());
        itemData.updatedAt = formatDate(new Date());
        itemData.ownerId = user.uid;
        itemData.username = user.username;
        itemData.avatarUrl = user.avatarUrl;

        try {
            const newDocRef = doc(collection(db, "items"));

            itemData._id = newDocRef.id;

            await setDoc(newDocRef, itemData);

            navigate('/items');
        } catch (error) {
            console.log(error);
        }
    };

    return { createAction };
};