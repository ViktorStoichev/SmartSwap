// Footer Component
// Site-wide footer with navigation links, contact information, and social media

import './Footer.css'
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="footer">
            {/* Main footer content with multiple sections */}
            <div className="footer-content">
                {/* Company information section */}
                <div className="footer-section">
                    <h3>SmartSwap</h3>
                    <p>Your trusted peer-to-peer marketplace for buying and selling second-hand smartphones. Connect directly with sellers and buyers in your community.</p>
                </div>

                {/* Quick navigation links */}
                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link to="/phones">Browse Phones</Link></li>
                        <li><Link to="/phones/sell">Sell Your Phone</Link></li>
                        <li><Link to="/chat-list">Messages</Link></li>
                        <li><Link to="/about">How It Works</Link></li>
                    </ul>
                </div>

                {/* Popular phone brands */}
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

                {/* Contact information */}
                <div className="footer-section">
                    <h3>Contact Us</h3>
                    <ul className="contact-info">
                        <li><i className="fa-solid fa-envelope"></i> support@smartswap.com</li>
                        <li><i className="fa-solid fa-phone"></i> +1 (555) 123-4567</li>
                        <li><i className="fa-solid fa-location-dot"></i> 123 Tech Street, Digital City</li>
                    </ul>
                </div>
            </div>

            {/* Footer bottom with social links and copyright */}
            <div className="footer-bottom">
                {/* Social media links */}
                <div className="social-links">
                    <Link href="#" aria-label="Facebook"><i className="fa-brands fa-facebook"></i></Link>
                    <Link href="#" aria-label="Twitter"><i className="fa-brands fa-twitter"></i></Link>
                    <Link href="#" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></Link>
                    <Link href="#" aria-label="LinkedIn"><i className="fa-brands fa-linkedin"></i></Link>
                </div>
                
                {/* Copyright information with dynamic year */}
                <p>Created by <strong>Viktor Stoichev</strong> &copy; {new Date().getFullYear()}</p>
            </div>
        </footer>
    );
}