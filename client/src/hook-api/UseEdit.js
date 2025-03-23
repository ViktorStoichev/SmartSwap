import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../server/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import formatDate from "../utils/formatDate";

export const useEdit = () => {
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
        let isMounted = true;

        const fetchProduct = async () => {
            if(!user) {
                return;
            }
            const docRef = doc(db, "items", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                if (data.ownerId !== user.uid) {
                    navigate(`/phones/${id}`);
                    return;
                }
                if (isMounted) {
                    setEditedProduct({
                        title: data.title,
                        description: data.description,
                        price: data.price,
                        imageUrl: data.imageUrl,
                    });
                }
            } else {
                navigate("/");
            }
        };
        fetchProduct();

        return () => {
            isMounted = false;
        }
    }, [id, navigate, user]);

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEditSubmit = async () => {
        const productRef = doc(db, "items", id);
        await updateDoc(productRef, {
            title: editedProduct.title,
            description: editedProduct.description,
            price: editedProduct.price,
            imageUrl: editedProduct.imageUrl,
            updatedAt: formatDate(new Date()),
        });
        navigate(`/phones/${id}`);
    };

    return { editedProduct, handleEditChange, handleEditSubmit };
};