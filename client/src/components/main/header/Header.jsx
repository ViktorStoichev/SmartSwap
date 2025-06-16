import { NavLink, useNavigate } from 'react-router-dom';
import './Header.css'
import { useAuth } from '../../../contexts/AuthContext';
import { useLogout } from '../../../hook-api/UseLogout';
import { useState } from 'react';

export default function Header() {
    const { user } = useAuth();
    const { logout } = useLogout();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/phones?search=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
        }
    };

    return (
        <header>
            <nav className='user-links'>
                <div className="logo-search">
                    <h1><NavLink to="/">SmartSwap</NavLink></h1>
                    <form onSubmit={handleSearch} className="search-form">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button type="submit">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </form>
                </div>
                <ul>
                    {user
                        ?
                        <>
                            <li><NavLink to="/chat-list" className={({ isActive }) => isActive ? "active-link" : ""}><i className="fa-solid fa-comments"></i></NavLink></li>
                            <li><NavLink to="/phones/liked" className={({ isActive }) => isActive ? "active-link" : ""}><i className="fa-solid fa-heart"></i></NavLink></li>
                            <li><NavLink to={`/profile/${user.uid}`} className={({ isActive }) => isActive ? "active-link" : ""}><i className="fa-solid fa-user"></i></NavLink></li>
                            <li><NavLink to="#" onClick={handleLogout}><i className="fa-solid fa-right-from-bracket"></i></NavLink></li>
                        </>
                        :
                        <>
                            <li><NavLink to="/login" className={({ isActive }) => isActive ? "active-link" : ""}>Login</NavLink></li>
                            <li><NavLink to="/register" className={({ isActive }) => isActive ? "active-link" : ""}>Register</NavLink></li>
                        </>
                    }
                </ul>
            </nav>
            <nav className='main-links'>
                <ul>
                    <li><NavLink to="/phones" end className={({ isActive }) => isActive ? "active-link" : ""}>Phones</NavLink></li>
                    <li><NavLink to="/about" className={({ isActive }) => isActive ? "active-link" : ""}>About</NavLink></li>
                    <li><NavLink to="/contact" className={({ isActive }) => isActive ? "active-link" : ""}>Contact</NavLink></li>
                    <li><NavLink to="/phones/sell" className={({ isActive }) => isActive ? "active-link" : ""}>Sell</NavLink></li>
                </ul>
            </nav>
        </header>
    );
}
