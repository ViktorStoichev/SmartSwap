// Guest Guard Component
// Route protection component that restricts access to guest-only routes (login/register)
// Redirects authenticated users to 404 page if they try to access guest routes

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function GuestGuard() {
    // Get current user from authentication context
    const { user } = useAuth();

    // Check if user is already authenticated
    if (user) {
        // Redirect authenticated users to 404 page
        return <Navigate to="/404" />
    }

    // Allow guest users to access the protected route
    return <Outlet />;
};