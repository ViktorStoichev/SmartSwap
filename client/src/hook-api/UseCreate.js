import formatDate from "../utils/formatDate";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { createPhonePost } from "../services/createPhonePost";

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
        itemData.pending = true;
        // Ensure model and brand are present
        if (!itemData.model || !itemData.brand || !itemData.quality) {
            throw new Error("Model, brand, and quality are required fields");
        }

        try {
            await createPhonePost(itemData);
            navigate('/phones');
        } catch (error) {
            console.log(error);
        }
    };

    return { createAction };
};