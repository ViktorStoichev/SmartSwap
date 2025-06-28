// Custom hook for handling user registration with complete functionality

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useActionState } from "react";
import { registerUser } from "../../services/auth-services/registerUser";
import { useErrorHandler } from "../../errors/handleError";
import { checkProfanity, showProfanityAlert } from "../../utils/profanityCheck";

// Action function for handling form submission with useActionState
const registerAction = async (prevState, formData) => {
    // Extract form data from the form submission
    const { email, password, repeatPassword, username, address, avatarUrl } = Object.fromEntries(formData);

    try {
        // Call the registration service to create user account and store data
        const user = await registerUser(email, password, repeatPassword, username, address, avatarUrl);
        
        // Return success state for successful registration
        return { success: true };
    } catch (error) {
        // Return error state for failed registration
        return { error: error.message };
    }
};

export const useRegister = () => {
    // React Router navigation hook for redirecting after registration
    const navigate = useNavigate();
    
    // Use React's useActionState for form handling
    const [state, dispatch] = useActionState(registerAction, { error: null, success: false });
    
    // Error handling hook for form validation
    const { errors, visibleErrors, handleRegisterError } = useErrorHandler();
    
    // State for tracking terms agreement checkbox
    const [termsAgreed, setTermsAgreed] = useState(false);

    // Handle input changes with profanity checking
    const handleInputChange = (e) => {
        const { value, name } = e.target;
        
        // Check for profanity in the input value
        if (checkProfanity(value)) {
            // Show profanity alert and clear the input field
            showProfanityAlert();
            e.target.value = '';
        }
    };

    // Navigate to home page when registration is successful
    useEffect(() => {
        if (state.success) {
            navigate("/");
        }
    }, [state.success, navigate]);

    // Check if form is valid based on errors and terms agreement
    const isFormValid = !Object.values(errors).some(Boolean) && termsAgreed;

    // Return all state values and handlers for the component to use
    return { 
        state, 
        dispatch, 
        termsAgreed, 
        setTermsAgreed, 
        errors, 
        visibleErrors, 
        handleRegisterError, 
        handleInputChange, 
        isFormValid 
    };
};