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
        title: "",
        description: "",
        price: "",
        imageUrl: "",
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
                    title: data.title,
                    description: data.description,
                    price: data.price,
                    imageUrl: data.imageUrl,
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

    const handleEditSubmit = async () => {
        await editPhone(id, editedProduct);
        navigate(`/phones/${id}`);
    };

    return { editedProduct, handleEditChange, handleEditSubmit };
};