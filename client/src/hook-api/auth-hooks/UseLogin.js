// Custom hook for handling user login with complete form state management

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logUser } from "../../services/auth-services/logUser";

export const useLogin = () => {
    // State for storing user's email input
    const [email, setEmail] = useState("");
    
    // State for storing user's password input
    const [password, setPassword] = useState("");
    
    // State for storing login error messages
    const [error, setError] = useState("");
    
    // State for remember me checkbox (visual only)
    const [rememberMe, setRememberMe] = useState(false);
    
    // React Router navigation hook for redirecting after login
    const navigate = useNavigate();

    // Handle complete login process including form submission and navigation
    const handleLogin = async (e) => {
        // Prevent default form submission behavior
        e.preventDefault();

        try {
            // Call the authentication service to log in the user
            await logUser(email, password);
            
            // Clear any previous error messages on successful login
            setError("");
            
            // Navigate to home page after successful authentication
            navigate('/');
        } catch (err) {
            // Set error message for failed login attempts
            setError("Wrong email or password!");
        }
    };

    // Return all state values and handlers for the component to use
    return { 
        email, 
        setEmail, 
        password, 
        setPassword, 
        error, 
        rememberMe, 
        setRememberMe, 
        handleLogin 
    };
};