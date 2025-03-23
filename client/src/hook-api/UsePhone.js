import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../../server/firebase";
import { arrayRemove, arrayUnion, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import formatDate from "../utils/formatDate";

export const usePhone = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [comment, setComment] = useState("");
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;

        const fetchProduct = async () => {
            const docRef = doc(db, "items", id);
            const docSnap = await getDoc(docRef);
            if (isMounted) {
                if (docSnap.exists()) {
                    setProduct({ id: docSnap.id, ...docSnap.data() });
                }
            }
        };
        fetchProduct();

        return () => {
            isMounted = false;
        }

    }, [id]);

    const handleLike = async () => {
        if (!user) return;
        const productRef = doc(db, "items", id);
        const isLiked = product.likes.includes(user.uid);

        await updateDoc(productRef, {
            likes: isLiked ? arrayRemove(user.uid) : arrayUnion(user.uid),
        });
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

        const productRef = doc(db, "items", id);
        await updateDoc(productRef, {
            comments: arrayUnion(newComment),
        });

        setProduct((prev) => ({
            ...prev,
            comments: [...prev.comments, newComment],
        }));
        setComment("");
    };

    const handleDelete = async () => {
        await deleteDoc(doc(db, "items", id));
        navigate("/phones");

    };

    return {
        product,
        comment,
        handleCommentSubmit,
        handleDelete,
        handleLike
    }
};