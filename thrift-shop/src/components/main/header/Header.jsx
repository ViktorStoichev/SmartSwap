import './Header.css'

export default function Header() {

    return (
        <header>
            <h1>Thrift Shop</h1>
            <nav className='main-links'>
                <ul>
                    <li><a href=""><i className="fa-solid fa-house"></i></a></li>
                    <li><a href=""><i className="fa-solid fa-heart"></i></a></li>
                    <li><a href=""><i className="fa-solid fa-user"></i></a></li>
                    <li><a href="">Products</a></li>
                    <li><a href="">About</a></li>
                    <li><a href=""><i className="fa-solid fa-phone"></i></a></li>
                </ul>
            </nav>
            <nav className='user-links'>
                <ul>
                    <li><a href="">Login</a></li>
                    <li><a href="">Register</a></li>
                    <li><a href="">Logout</a></li>
                </ul>
            </nav>
        </header>
    );
}