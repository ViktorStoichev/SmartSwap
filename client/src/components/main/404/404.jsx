// 404 Not Found Page Component
// Displays a user-friendly error page when users navigate to non-existent routes

import React from "react";
import './404.css';
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  // Hook for programmatic navigation back to home
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <div className="notfound-content">
        {/* Main error heading */}
        <h1 className="notfound-title">404</h1>
        <h2 className="notfound-subtitle">Page Not Found</h2>
        
        {/* Error description and helpful suggestions */}
        <p className="notfound-text">
          Oops! The page you're looking for seems to have vanished into thin air.
        </p>
        <p className="notfound-suggestion">
          Don't worry! You can either:
        </p>
        
        {/* List of helpful actions user can take */}
        <ul className="notfound-options">
          <li>Go back to the home page</li>
          <li>Check if the URL is correct</li>
          <li>Try searching for what you need</li>
        </ul>
        
        {/* Navigation button to return to home */}
        <div className="notfound-button-container">
          <button className="notfound-back-button" onClick={() => navigate("/")}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(NotFoundPage);