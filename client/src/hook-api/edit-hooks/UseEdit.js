// Edit Phone Hook
// Manages phone listing editing process, data fetching, and form state
// Handles authorization checks, data loading, and submission of edited phone data

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { getOnePhone } from "../../services/get-phones-services/getOnePhone";
import { editPhone } from "../../services/phone-action-services/editPhone";

export const useEdit = () => {
    // Get phone ID from URL parameters
    const { id } = useParams();
    
    // Navigation hook for redirecting after operations
    const navigate = useNavigate();
    
    // Get current authenticated user for authorization checks
    const { user } = useAuth();

    // State for managing edited phone data
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

    // Loading state to track editing process
    const [isEditing, setIsEditing] = useState(false);

    // Fetch phone data and set up form on component mount
    useEffect(() => {
        // Flag to prevent state updates if component unmounts during async operation
        let isMounted = true;

        const fetchProduct = async () => {
            // Return early if user is not authenticated
            if (!user) {
                return;
            }

            // Fetch phone data from backend
            const data = await getOnePhone(id);

            // Check if current user is the owner of the phone listing
            if (data.ownerId !== user.uid) {
                // Redirect to phone details if user is not the owner
                navigate(`/phones/${id}`);
                return;
            }

            // Update state only if component is still mounted
            if (isMounted) {
                setEditedProduct({
                    model: data.model,
                    brand: data.brand,
                    quality: data.quality,
                    description: data.description,
                    price: data.price,
                    color: data.color,
                    memory: data.memory,
                    // Handle images array - parse JSON if needed, ensure it's an array
                    images: data.images ? (Array.isArray(data.images) ? data.images : JSON.parse(data.images)) : [],
                });
            }
        };
        
        // Execute the fetch operation
        fetchProduct();

        // Cleanup function to prevent memory leaks
        return () => {
            isMounted = false;
        }
    }, [id, navigate, user]);

    // Handle form input changes
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle form submission with updated phone data
    const handleEditSubmit = async (imagesArg) => {
        setIsEditing(true);
        
        try {
            // Prepare updated product data
            const updatedProduct = {
                ...editedProduct,
                pending: true, // Set as pending for admin approval
                images: imagesArg || editedProduct.images // Use new images or existing ones
            };
            
            // Submit updated data to backend
            await editPhone(id, updatedProduct);
            
            // Navigate back to phone details page after successful edit
            navigate(`/phones/${id}`);
        } catch (error) {
            // Log error for debugging (consider adding user notification)
            console.error('Error editing phone:', error);
            throw error; // Re-throw to allow error handling in calling component
        } finally {
            setIsEditing(false);
        }
    };

    // Return form state and handler functions
    return { editedProduct, handleEditChange, handleEditSubmit, isEditing };
};