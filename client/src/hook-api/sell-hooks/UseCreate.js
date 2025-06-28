// Create Phone Hook
// Manages phone listing creation process and data preparation
// Handles form data processing, metadata addition, and navigation after creation

import { useState } from "react";
import formatDate from "../../utils/formatDate";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { createPhonePost } from "../../services/sell-services/createPhonePost";

export const useCreate = () => {
    // Get current authenticated user for owner information
    const { user } = useAuth();
    
    // Navigation hook for redirecting after successful creation
    const navigate = useNavigate();

    // Loading state to track creation process
    const [isCreating, setIsCreating] = useState(false);

    // Main function to create a new phone listing
    const createAction = async (formData) => {
        setIsCreating(true);
        
        try {
            // Convert FormData to plain object for easier manipulation
            const itemData = Object.fromEntries(formData);
            
            // Initialize empty arrays for comments and likes
            itemData.comments = [];
            itemData.likes = [];
            
            // Add creation and update timestamps using formatted dates
            itemData.createdAt = formatDate(new Date());
            itemData.updatedAt = formatDate(new Date());
            
            // Add owner information from authenticated user
            itemData.ownerId = user.uid;
            itemData.username = user.username;
            itemData.avatarUrl = user.avatarUrl;
            
            // Set listing as pending for admin approval
            itemData.pending = true;
            
            // Validate required fields before submission
            if (!itemData.model || !itemData.brand || !itemData.quality) {
                throw new Error("Model, brand, and quality are required fields");
            }

            // Submit phone listing to backend service
            await createPhonePost(itemData);
            
            // Navigate to phones catalog after successful creation
            navigate('/phones');
        } catch (error) {
            // Log error for debugging (consider adding user notification)
            console.log(error);
            throw error; // Re-throw to allow error handling in calling component
        } finally {
            setIsCreating(false);
        }
    };

    // Return the create action function and loading state
    return { createAction, isCreating };
};