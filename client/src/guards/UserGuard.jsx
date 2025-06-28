// User Guard Component
// Route protection component that restricts access to authenticated user routes
// Handles loading states and redirects unauthenticated users to 404 page

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Loader from "../components/main/loader/Loader";

export default function UserGuard() {
    // Get current user and loading state from authentication context
    const { user, isLoading } = useAuth();

    // Show loading spinner while authentication state is being determined
    if (isLoading) { 
        return (
            <div style={{ position: 'relative', minHeight: '100vh', width: '100%' }}>
                <Loader />
            </div>
        );
    }

    // Check if user is not authenticated
    if (!user) {
        // Redirect unauthenticated users to 404 page
        return <Navigate to="/404" />
    }

    // Allow authenticated users to access the protected route
    return <Outlet />;
};