import { NavLink, useNavigate } from 'react-router-dom';
import './Header.css'
import { useAuth } from '../../../contexts/AuthContext';
import { useLogout } from '../../../hook-api/UseLogout';

export default function Header() {
    const { user } = useAuth();
    const { logout } = useLogout();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <header>
            <h1>SmartSwap</h1>
            <nav className='main-links'>
                <ul>
                    <li><NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""}><i className="fa-solid fa-house"></i></NavLink></li>
                    <li><NavLink to="/phones" end className={({ isActive }) => isActive ? "active-link" : ""}>Phones</NavLink></li>
                    <li><NavLink to="/phones/sell" className={({ isActive }) => isActive ? "active-link" : ""}>Sell Phone <i className="fa-solid fa-plus"></i></NavLink></li>
                    <li><NavLink to="/about" className={({ isActive }) => isActive ? "active-link" : ""}>About</NavLink></li>
                </ul>
            </nav>
            <nav className='user-links'>
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
        </header>
    );
}
