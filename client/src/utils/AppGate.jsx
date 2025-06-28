// App Gate Component
// Application entry point that manages authentication state and loading
// Handles post-logout redirects and ensures app is ready before rendering children

import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../server/firebase';
import Loader from '../components/main/loader/Loader';

export default function AppGate({ children }) {
    // State to track if app is ready to render
    const [ready, setReady] = useState(false);
    
    // State to track if redirect is needed after logout
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        // Subscribe to Firebase authentication state changes
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            // Check if user logged out and redirect flag is set
            if (!user && localStorage.getItem('redirectAfterLogout') === 'true') {
                // Clear the redirect flag and trigger redirect
                localStorage.removeItem('redirectAfterLogout');
                setRedirect(true);
            } else {
                // App is ready to render (user is logged in or no redirect needed)
                setReady(true);
            }
        });
        
        // Cleanup subscription when component unmounts
        return () => unsubscribe();
    }, []);

    // Show loader while app is initializing
    if (!ready && !redirect) {
        return <Loader />;
    }
    
    // Handle post-logout redirect to home page
    if (redirect) {
        window.location.replace('/');
        return <Loader />;
    }
    
    // Render app content when ready
    return children;
} 