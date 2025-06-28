// Custom hook for fetching and managing user profile data and phone listings

import { useState, useEffect } from 'react';
import { getUserData } from '../../services/auth-services/getUserProfile';
import { getUserPhones } from '../../services/get-phones-services/getUserPhones';

const UseProfile = (id) => {
    // State for storing the user's profile information
    const [user, setUser] = useState(null);
    
    // State for storing user's phone posts that are pending approval
    const [pendingPosts, setPendingPosts] = useState([]);
    
    // State for storing user's phone posts that have been approved
    const [approvedPosts, setApprovedPosts] = useState([]);
    
    // State for tracking data loading status
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Flag to prevent state updates if component unmounts during async operations
        let isMounted = true;

        // Fetch user profile data from the server using the provided user ID
        const fetchProfile = async () => {
            try {
                // Call the user profile service to get user data
                const data = await getUserData(id);
                
                // Only update state if component is still mounted
                if (isMounted) {
                    // Store the fetched user data in state
                    setUser(data);
                    
                    // Mark loading as complete after successful data fetch
                    setLoading(false);
                }
            } catch (error) {
                // Log error for debugging purposes
                console.error('Error fetching user profile:', error);
                
                // Mark loading as complete even if there's an error
                if (isMounted) setLoading(false);
            }
        };

        // Fetch user's phone listings and separate them by approval status
        const fetchUserPosts = async () => {     
            try {
                // Call the user phones service to get all user's phone posts
                const posts = await getUserPhones(id);
                
                // Only update state if component is still mounted
                if (isMounted) {
                    // Filter and store posts that are pending approval
                    setPendingPosts(posts.filter(post => post.pending));
                    
                    // Filter and store posts that have been approved
                    setApprovedPosts(posts.filter(post => !post.pending));
                }
            } catch (error) {
                // Log error for debugging purposes
                console.error('Error fetching user posts:', error);
            }
        };

        // Only fetch data if a valid user ID is provided
        if (id) {
            // Fetch both profile data and user posts in parallel
            fetchProfile();
            fetchUserPosts();
        } else {
            // If no ID provided, mark loading as complete
            setLoading(false);
        }

        // Cleanup function to prevent state updates on unmounted component
        return () => {
            isMounted = false;
        }
    }, [id]);

    // Return all state values for the component to use
    return { user, pendingPosts, approvedPosts, loading };
};

export default UseProfile; 