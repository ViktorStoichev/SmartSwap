// Header Component
// Main navigation header with search functionality, user authentication, and site navigation

import React from "react";
import { NavLink } from 'react-router-dom';
import './Header.css'
import { useAuth } from '../../../contexts/AuthContext';
import { useHeader } from '../../../hook-api/header-hooks/UseHeader';

function Header() {
    // Authentication context for user state
    const { user } = useAuth();
    
    // Header functionality from custom hook
    const {
        searchQuery,
        handleLogout,
        handleSearch,
        handleSearchChange
    } = useHeader();

    return (
        <header>
            {/* Top navigation bar with logo, search, and user actions */}
            <nav className='user-links'>
                <div className="logo-search">
                    {/* Site logo and home link */}
                    <h1><NavLink to="/">SmartSwap</NavLink></h1>
                    
                    {/* Search form */}
                    <form onSubmit={handleSearch} className="search-form">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <button type="submit">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </form>
                </div>
                
                {/* User-specific navigation links */}
                <ul>
                    {user ? (
                        // Authenticated user navigation
                        <>
                            {/* Chat messages link */}
                            <li><NavLink to="/chat-list" className={({ isActive }) => isActive ? "active-link" : ""}><i className="fa-solid fa-comments"></i></NavLink></li>
                            
                            {/* Liked phones link */}
                            <li><NavLink to="/phones/liked" className={({ isActive }) => isActive ? "active-link" : ""}><i className="fa-solid fa-heart"></i></NavLink></li>
                            
                            {/* User profile link */}
                            <li><NavLink to={`/profile/${user.uid}`} className={({ isActive }) => isActive ? "active-link" : ""}><i className="fa-solid fa-user"></i></NavLink></li>
                            
                            {/* Admin panel link (only for admin users) */}
                            {user.admin && (
                                <li><NavLink to="/admin" className={({ isActive }) => isActive ? "active-link" : ""}><i className="fa-solid fa-shield-halved"></i></NavLink></li>
                            )}
                            
                            {/* Logout link */}
                            <li><NavLink to="#" onClick={handleLogout}><i className="fa-solid fa-right-from-bracket"></i></NavLink></li>
                        </>
                    ) : (
                        // Guest user navigation
                        <>
                            {/* Login link */}
                            <li><NavLink to="/login" className={({ isActive }) => isActive ? "active-link" : ""}>Login</NavLink></li>
                            
                            {/* Register link */}
                            <li><NavLink to="/register" className={({ isActive }) => isActive ? "active-link" : ""}>Register</NavLink></li>
                        </>
                    )}
                </ul>
            </nav>
            
            {/* Main site navigation */}
            <nav className='main-links'>
                <ul>
                    {/* Browse phones link */}
                    <li><NavLink to="/phones" end className={({ isActive }) => isActive ? "active-link" : ""}>Phones</NavLink></li>
                    
                    {/* About page link */}
                    <li><NavLink to="/about" className={({ isActive }) => isActive ? "active-link" : ""}>About</NavLink></li>
                    
                    {/* Contact page link */}
                    <li><NavLink to="/contacts" className={({ isActive }) => isActive ? "active-link" : ""}>Contacts</NavLink></li>
                    
                    {/* Sell phone link */}
                    {user && (
                    <li><NavLink to="/phones/sell" className={({ isActive }) => isActive ? "active-link green-link" : "green-link"}>Sell</NavLink></li>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default React.memo(Header);
