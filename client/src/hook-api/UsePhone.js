import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import formatDate from "../utils/formatDate";
import { getOnePhone } from "../services/getOnePhone";
import { likePhone } from "../services/likePhone";
import { commentPhone } from "../services/commentPhone";
import { deletePhone } from "../services/deletePhone";

export const usePhone = () => {
    const { id: phoneId } = useParams();
    const [product, setProduct] = useState(null);
    const [comment, setComment] = useState("");
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;

        const fetchProduct = async () => {
            const phoneData = await getOnePhone(phoneId);
            if (isMounted) {
                setProduct(phoneData);
            }
        };
        fetchProduct();

        return () => {
            isMounted = false;
        }

    }, [phoneId]);

    const handleLike = async () => {
        if (!user) return;

        const isLiked = product.likes.includes(user.uid);

        await likePhone(phoneId, isLiked, user.uid);

        setProduct((prev) => ({
            ...prev,
            likes: isLiked ? prev.likes.filter((uid) => uid !== user.uid) : [...prev.likes, user.uid],
        }));
    };

    const handleCommentSubmit = async () => {
        if (!user || !comment.trim()) return;

        const newComment = {
            userId: user.uid,
            username: user.username,
            avatarUrl: user.avatarUrl,
            text: comment,
            date: formatDate(new Date()),
        };

        await commentPhone(phoneId, newComment);

        setProduct((prev) => ({
            ...prev,
            comments: [...prev.comments, newComment],
        }));
        setComment("");
    };

    const handleDelete = async () => {
        await deletePhone(phoneId)
        navigate("/phones");
    };

    return {
        product,
        comment,
        setComment,
        handleCommentSubmit,
        handleDelete,
        handleLike
    }
};