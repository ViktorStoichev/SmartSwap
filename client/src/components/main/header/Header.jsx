import { Link } from 'react-router-dom';
import './Header.css'
import { logoutUser } from "../../../services/firebase";
import { useAuth } from '../../../contexts/AuthContext';

export default function Header() {
    const { user } = useAuth();

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
                    <li><Link to="/items">Products</Link></li>
                    <li><Link to="/items/add">Add a product <i className="fa-solid fa-plus"></i></Link></li>
                    <li><Link to="/about">About</Link></li>
                </ul>
            </nav>
            <nav className='user-links'>
                <ul>
                    {user
                        ?
                        <>
                            <li><Link to=""><i className="fa-solid fa-heart"></i></Link></li>
                            <li><Link to={`/profile/${user.uid}`}><i className="fa-solid fa-user"></i></Link></li>
                            <li><Link onClick={handleLogout}><i className="fa-solid fa-right-from-bracket"></i></Link></li>
                        </>
                        :
                        <>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/register">Register</Link></li>
                        </>
                    }
                </ul>
            </nav>
        </header>
    );
}