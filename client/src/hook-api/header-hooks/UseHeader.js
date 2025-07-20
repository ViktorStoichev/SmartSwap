// Custom hook for managing header functionality
// Handles search functionality, logout process, and navigation

import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../auth-hooks/UseLogout';

export const useHeader = () => {
    // State for search functionality
    const [searchQuery, setSearchQuery] = useState('');
    
    // Navigation and logout hooks
    const navigate = useNavigate();
    const { logout } = useLogout();

    // Handle logout with redirect flag
    const handleLogout = useCallback(async () => {
        localStorage.setItem('redirectAfterLogout', 'true');
        await logout();
    }, [logout]);

    // Handle search form submission
    const handleSearch = useCallback((e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/phones?search=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
        }
    }, [navigate, searchQuery]);

    // Handle search input changes
    const handleSearchChange = useCallback((e) => {
        setSearchQuery(e.target.value);
    }, []);

    return {
        // State
        searchQuery,
        
        // Handlers
        handleLogout,
        handleSearch,
        handleSearchChange
    };
};