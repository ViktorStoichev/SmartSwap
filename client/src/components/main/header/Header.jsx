import { Link } from 'react-router-dom';
import './Header.css'
import { auth, logoutUser } from "../../../firebase";
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

export default function Header() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            setUser(authUser)
        });

        return () => unsubscribe();
    });

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
                    <li><Link to="">Products</Link></li>
                    <li><Link to="">Add a product <i class="fa-solid fa-plus"></i></Link></li>
                    <li><Link to="/about">About</Link></li>
                </ul>
            </nav>
            <nav className='user-links'>
                <ul>
                    {user
                        ? 
                        <>
                            <li><Link to=""><i className="fa-solid fa-heart"></i></Link></li>
                            <li><Link to="/profile"><i className="fa-solid fa-user"></i></Link></li>
                            <li><Link onClick={handleLogout}><i class="fa-solid fa-right-from-bracket"></i></Link></li>
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