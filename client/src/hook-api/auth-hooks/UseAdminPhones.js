// Custom hook for fetching and managing pending phone listings

import { useState, useEffect } from 'react';
import { getPendingPhones } from '../../services/get-phones-services/phoneService';

const UseAdminPhones = () => {
    // State for storing all pending phone listings
    const [pendingPhones, setPendingPhones] = useState([]);
    
    // State for tracking data loading status
    const [loading, setLoading] = useState(true);

    // Fetch all pending phone listings from the server
    const fetchPendingPhones = async () => {
        try {
            // Call the phone service to get all pending phone listings
            const phones = await getPendingPhones();
            
            // Store the fetched pending phones in state
            setPendingPhones(phones);
        } catch (error) {
            // Log error for debugging purposes
            console.error('Error fetching pending phones:', error);
        } finally {
            // Mark loading as complete regardless of success or failure
            setLoading(false);
        }
    };

    // Fetch pending phones when the hook is first initialized
    useEffect(() => {
        fetchPendingPhones();
    }, []);

    // Return pending phones data and loading status for the component to use
    return { pendingPhones, loading };
};

export default UseAdminPhones; 