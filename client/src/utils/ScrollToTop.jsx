// Scroll To Top Component
// Automatically scrolls to top of page when route changes
// Provides better user experience by ensuring users start at the top of new pages

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
    // Get current route pathname to detect navigation changes
    const { pathname } = useLocation();

    useEffect(() => {
        // Smoothly scroll to top of page when route changes
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Provides smooth scrolling animation
        });
    }, [pathname]); // Trigger effect when pathname changes

    // This component doesn't render anything visible
    return null;
}

export default ScrollToTop; 