// Custom hook for handling user permissions and access control

import { useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const useDetailsPermissions = (user, product) => {
    // React Router navigation hook for redirects
    const navigate = useNavigate();

    // Calculate user permissions and access rights
    const permissions = useMemo(() => {
        if (!product) return {};

        // Check if user is the owner of the product
        const isOwner = user && product.ownerId === user.uid;
        
        // Check if user is an admin
        const isAdmin = user && user.admin;
        
        // Check if user can view the product (owner, admin, or not pending)
        const canView = isOwner || isAdmin || !product.pending;

        return {
            isOwner,
            isAdmin,
            canView
        };
    }, [user, product]);

    // Redirect if user doesn't have permission to view
    const checkViewPermission = useCallback(() => {
        if (!permissions.canView) {
            navigate('/phones');
            return false;
        }
        return true;
    }, [permissions.canView, navigate]);

    // Return permissions and permission checking function
    return {
        // Permission flags
        ...permissions,
        
        // Permission checking function
        checkViewPermission
    };
};