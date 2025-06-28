// Phone Details Hook
// Manages individual phone listing details, interactions, and state
// Handles likes, comments, deletion, and data fetching for phone details page

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import formatDate from "../../utils/formatDate";
import { getOnePhone } from "../../services/get-phones-services/getOnePhone";
import { likePhone } from "../../services/interaction-services/likePhone";
import { commentPhone } from "../../services/interaction-services/commentPhone";
import { deletePhone } from "../../services/phone-action-services/deletePhone";

export const usePhone = () => {
    // Get phone ID from URL parameters
    const { id: phoneId } = useParams();
    
    // State for storing phone details
    const [product, setProduct] = useState(null);
    
    // State for comment input field
    const [comment, setComment] = useState("");
    
    // Loading state to track deletion process
    const [isDeleting, setIsDeleting] = useState(false);
    
    // Get current authenticated user for interactions
    const { user } = useAuth();
    
    // Navigation hook for redirecting after operations
    const navigate = useNavigate();

    // Fetch phone data on component mount
    useEffect(() => {
        // Flag to prevent state updates if component unmounts during async operation
        let isMounted = true;

        const fetchProduct = async () => {
            // Fetch phone details from backend
            const phoneData = await getOnePhone(phoneId);
            
            // Update state only if component is still mounted
            if (isMounted) {
                setProduct(phoneData);
            }
        };
        
        // Execute the fetch operation
        fetchProduct();

        // Cleanup function to prevent memory leaks
        return () => {
            isMounted = false;
        }

    }, [phoneId]);

    // Handle like/unlike functionality
    const handleLike = async () => {
        // Return early if user is not authenticated
        if (!user) return;

        // Check if user has already liked the phone
        const isLiked = product.likes.includes(user.uid);

        // Submit like/unlike action to backend
        await likePhone(phoneId, isLiked, user.uid);

        // Update local state to reflect the change
        setProduct((prev) => ({
            ...prev,
            likes: isLiked ? prev.likes.filter((uid) => uid !== user.uid) : [...prev.likes, user.uid],
        }));
    };

    // Handle comment submission
    const handleCommentSubmit = async () => {
        // Return early if user is not authenticated or comment is empty
        if (!user || !comment.trim()) return;

        // Create new comment object with user information and timestamp
        const newComment = {
            userId: user.uid,
            username: user.username,
            avatarUrl: user.avatarUrl,
            text: comment,
            date: formatDate(new Date()),
        };

        // Submit comment to backend
        await commentPhone(phoneId, newComment);

        // Update local state to include the new comment
        setProduct((prev) => ({
            ...prev,
            comments: [...prev.comments, newComment],
        }));
        
        // Clear comment input field
        setComment("");
    };

    // Handle phone deletion
    const handleDelete = async () => {
        setIsDeleting(true);
        
        try {
            // Parse images array if it's stored as a string
            const imagesArray = (typeof product.images) === "string" ? JSON.parse(product.images) : product.images;
            
            // Delete phone from backend
            await deletePhone(phoneId, imagesArray);
            
            // Navigate back to phones catalog after successful deletion
            navigate("/phones");
        } catch (error) {
            // Log error for debugging (consider adding user notification)
            console.error('Error deleting phone:', error);
            throw error; // Re-throw to allow error handling in calling component
        } finally {
            setIsDeleting(false);
        }
    };

    // Return phone data and interaction handlers
    return {
        product,
        comment,
        setComment,
        handleCommentSubmit,
        handleDelete,
        handleLike,
        isDeleting
    }
};