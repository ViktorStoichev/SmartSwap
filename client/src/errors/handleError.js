// Error Handler Hook
// Manages form validation errors and their visibility states
// Provides centralized error handling for registration and phone data forms

import { useState } from "react";
import { validators } from "./validators";

export const useErrorHandler = () => {
    // Store validation error messages for each form field
    const [errors, setErrors] = useState({});
    
    // Control visibility of error messages with animation timing
    const [visibleErrors, setVisibleErrors] = useState({});

    // Handle registration form validation errors
    const handleRegisterError = (e) => {
        const { name, value, form } = e.target;
        // Get password value for password confirmation validation
        const passwordValue = form.password?.value;
        // Validate field using registration validators
        const errorMessage = validators.register(name, value, passwordValue);
    
        // Update errors state with new validation result
        setErrors((prev) => ({ ...prev, [name]: errorMessage }));
    
        if (errorMessage) {
            // Show error message after 100ms delay for smooth animation
            setTimeout(() => {
                setVisibleErrors((prev) => ({ ...prev, [name]: true }));
            }, 100);
        } else {
            // Hide error message immediately if validation passes
            setVisibleErrors((prev) => ({ ...prev, [name]: false }));
        }
    };

    // Handle phone data form validation errors
    const handlePhoneDataError = (e) => {
        const { name, value, files } = e.target;
        let val = value;
        
        // Special handling for image files validation
        if (name === "images") {
            // If files exist, use their length, else use value
            val = files ? files.length > 0 ? Array.from(files) : [] : value;
        }
        
        // Validate field using phone validators
        const errorMessage = validators.phone(name, val);
    
        // Update errors state with new validation result
        setErrors((prev) => ({ ...prev, [name]: errorMessage }));
    
        if (errorMessage) {
            // Show error message after 100ms delay for smooth animation
            setTimeout(() => {
                setVisibleErrors((prev) => ({ ...prev, [name]: true }));
            }, 100);
        } else {
            // Hide error message immediately if validation passes
            setVisibleErrors((prev) => ({ ...prev, [name]: false }));
        }
    };

    // Handle image validation separately (used in useEffect for real-time validation)
    const handleImagesError = (allImages) => {
        // Validate images using phone validators
        const errorMessage = validators.phone("images", allImages);
        
        // Update errors state
        setErrors((prev) => ({ ...prev, images: errorMessage }));
        
        if (errorMessage) {
            // Show error message after 100ms delay for smooth animation
            setTimeout(() => {
                setVisibleErrors((prev) => ({ ...prev, images: true }));
            }, 100);
        } else {
            // Hide error message immediately if validation passes
            setVisibleErrors((prev) => ({ ...prev, images: false }));
        }
    };

    // Return error states and handler functions
    return { errors, visibleErrors, handleRegisterError, handlePhoneDataError, handleImagesError };
}