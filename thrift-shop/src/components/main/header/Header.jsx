import { Link } from 'react-router-dom';
import './Header.css'
import { logoutUser } from "../../../firebase";

export default function Header() {

    const handleLogout = async () => {
        await logoutUser();
        console.log("Излезе успешно!");
    }

    return (
        <header>
            <h1>Thrift Shop</h1>
            <nav className='main-links'>
                <ul>
                    <li><Link to="/"><i className="fa-solid fa-house"></i></Link></li>
                    <li><Link to=""><i className="fa-solid fa-heart"></i></Link></li>
                    <li><Link to="/profile"><i className="fa-solid fa-user"></i></Link></li>
                    <li><Link to="">Products</Link></li>
                    <li><Link to="">About</Link></li>
                    <li><Link to=""><i className="fa-solid fa-phone"></i></Link></li>
                </ul>
            </nav>
            <nav className='user-links'>
                <ul>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                    <li><Link onClick={handleLogout}>Logout</Link></li>
                </ul>
            </nav>
        </header>
    );
}