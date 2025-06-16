import './Footer.css'
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>SmartSwap</h3>
                    <p>Your trusted peer-to-peer marketplace for buying and selling second-hand smartphones. Connect directly with sellers and buyers in your community.</p>
                </div>

                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link to="/phones">Browse Phones</Link></li>
                        <li><Link to="/phones/sell">Sell Your Phone</Link></li>
                        <li><Link to="/chat-list">Messages</Link></li>
                        <li><Link to="/about">How It Works</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Popular Brands</h3>
                    <ul>
                        <li>Samsung</li>
                        <li>Apple</li>
                        <li>Google</li>
                        <li>OnePlus</li>
                        <li>Xiaomi</li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Contact Us</h3>
                    <ul className="contact-info">
                        <li><i className="fa-solid fa-envelope"></i> support@smartswap.com</li>
                        <li><i className="fa-solid fa-phone"></i> +1 (555) 123-4567</li>
                        <li><i className="fa-solid fa-location-dot"></i> 123 Tech Street, Digital City</li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="social-links">
                    <Link href="#" aria-label="Facebook"><i className="fa-brands fa-facebook"></i></Link>
                    <Link href="#" aria-label="Twitter"><i className="fa-brands fa-twitter"></i></Link>
                    <Link href="#" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></Link>
                    <Link href="#" aria-label="LinkedIn"><i className="fa-brands fa-linkedin"></i></Link>
                </div>
                <p>Created by <strong>Viktor Stoichev</strong> &copy; {new Date().getFullYear()}</p>
            </div>
        </footer>
    );
}