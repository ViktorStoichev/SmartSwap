import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getOnePhone } from "../services/getOnePhone";
import { editPhone } from "../services/editPhone";

export const useEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [editedProduct, setEditedProduct] = useState({
        model: "",
        brand: "",
        quality: "",
        description: "",
        price: "",
        color: "",
        memory: "",
        images: [],
    });

    useEffect(() => {
        let isMounted = true;

        const fetchProduct = async () => {
            if (!user) {
                return;
            }

            const data = await getOnePhone(id);

            if (data.ownerId !== user.uid) {
                navigate(`/phones/${id}`);
                return;
            }

            if (isMounted) {
                setEditedProduct({
                    model: data.model,
                    brand: data.brand,
                    quality: data.quality,
                    description: data.description,
                    price: data.price,
                    color: data.color,
                    memory: data.memory,
                    images: data.images ? (Array.isArray(data.images) ? data.images : JSON.parse(data.images)) : [],
                });
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

    const handleEditSubmit = async (imagesArg) => {
        try {
            const updatedProduct = {
                ...editedProduct,
                pending: true,
                images: imagesArg || editedProduct.images
            };
            await editPhone(id, updatedProduct);
            navigate(`/phones/${id}`);
        } catch (error) {
            console.error('Error editing phone:', error);
            // You might want to add some error state handling here
        }
    };

    return { editedProduct, handleEditChange, handleEditSubmit };
};