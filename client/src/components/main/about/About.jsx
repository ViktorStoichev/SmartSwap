// About Page Component
// Displays information about SmartSwap platform, mission, and features

import { useNavigate } from "react-router-dom";
import './About.css';

export default function About() {
    // Hook for programmatic navigation back to home
    const navigate = useNavigate();

    return (
        <div className="about-page">
            {/* Main page title */}
            <h2 className="about-title">About SmartSwap</h2>
            
            {/* Mission statement section */}
            <div className="about-section">
                <h3>Our Mission</h3>
                <p className="about-text">
                    Welcome to SmartSwap, your trusted peer-to-peer marketplace for second-hand phones! We're dedicated to creating a secure and user-friendly platform where you can connect directly with other users to buy and sell pre-owned smartphones.
                </p>
            </div>

            {/* How it works process explanation */}
            <div className="about-section">
                <h3>How It Works</h3>
                <div className="process-steps">
                    {/* Step 1: List phone */}
                    <div className="step">
                        <i className="fa-solid fa-mobile-screen"></i>
                        <h4>List Your Phone</h4>
                        <p>Create a detailed listing with photos and description of your phone</p>
                    </div>
                    {/* Step 2: Connect with buyers */}
                    <div className="step">
                        <i className="fa-solid fa-comments"></i>
                        <h4>Connect with Buyers</h4>
                        <p>Chat directly with potential buyers through our messaging system</p>
                    </div>
                    {/* Step 3: Set price */}
                    <div className="step">
                        <i className="fa-solid fa-tag"></i>
                        <h4>Set Your Price</h4>
                        <p>Choose your asking price based on your phone's condition and market value</p>
                    </div>
                    {/* Step 4: Complete transaction */}
                    <div className="step">
                        <i className="fa-solid fa-handshake"></i>
                        <h4>Meet & Trade</h4>
                        <p>Arrange a safe meeting point to complete the transaction</p>
                    </div>
                </div>
            </div>

            {/* Platform features and benefits */}
            <div className="about-section">
                <h3>Why Choose SmartSwap?</h3>
                <div className="features-grid">
                    {/* Community feature */}
                    <div className="feature">
                        <i className="fa-solid fa-users"></i>
                        <h4>Community Driven</h4>
                        <p>Connect with local buyers and sellers in your area</p>
                    </div>
                    {/* Communication feature */}
                    <div className="feature">
                        <i className="fa-solid fa-comments"></i>
                        <h4>Direct Communication</h4>
                        <p>Built-in chat system for easy negotiation</p>
                    </div>
                    {/* Favorites feature */}
                    <div className="feature">
                        <i className="fa-solid fa-heart"></i>
                        <h4>Save Favorites</h4>
                        <p>Keep track of phones you're interested in</p>
                    </div>
                    {/* Safety feature */}
                    <div className="feature">
                        <i className="fa-solid fa-shield-halved"></i>
                        <h4>Safe Trading</h4>
                        <p>Tips and guidelines for secure transactions</p>
                    </div>
                </div>
            </div>

            {/* Company commitment section */}
            <div className="about-section">
                <h3>Our Commitment</h3>
                <p className="about-text">
                    At SmartSwap, we're committed to providing a transparent and user-friendly platform for peer-to-peer phone trading. We focus on connecting buyers and sellers directly, offering tools for safe communication and transaction. Whether you're looking to upgrade your phone or sell your current device, we make the process simple and community-focused.
                </p>
            </div>

            {/* Navigation back to home */}
            <div className="about-button-container">
                <button className="about-back-button" onClick={() => navigate("/")}>
                    Back to Home
                </button>
            </div>
        </div>
    );
};