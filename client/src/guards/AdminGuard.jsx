// Admin Guard Component
// Route protection component that restricts access to admin-only routes
// Redirects non-admin users to home page if they try to access admin routes

import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AdminGuard = () => {
    // Get current user from authentication context
    const { user } = useAuth();

    // Check if user exists and has admin privileges
    if (!user || !user.admin) {
        // Redirect non-admin users to home page
        return <Navigate to="/" replace />;
    }

    // Allow admin users to access the protected route
    return <Outlet />;
};

export default AdminGuard; 