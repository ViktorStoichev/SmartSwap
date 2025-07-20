// Contacts Page Component
// Displays contact information and ways to reach SmartSwap support

import React from "react";
import { useNavigate } from "react-router-dom";
import './Contacts.css';

function Contacts() {
    // Hook for programmatic navigation back to home
    const navigate = useNavigate();

    return (
        <div className="contacts-page">
            {/* Main page title */}
            <h2 className="contacts-title">Contact Us</h2>
            
            {/* Contact Information Section */}
            <div className="contacts-section">
                <h3>Get in Touch</h3>
                <p className="contacts-text">
                    Have questions, feedback, or need support? We're here to help! Reach out to us using any of the methods below and our team will get back to you as soon as possible.
                </p>
            </div>

            {/* Contact Methods Grid */}
            <div className="contacts-section">
                <h3>Contact Information</h3>
                <div className="contacts-grid">
                    {/* Email */}
                    <div className="contact-method">
                        <i className="fa-solid fa-envelope"></i>
                        <h4>Email</h4>
                        <p>support@smartswap.com</p>
                    </div>
                    {/* Phone */}
                    <div className="contact-method">
                        <i className="fa-solid fa-phone"></i>
                        <h4>Phone</h4>
                        <p>+1 (555) 123-4567</p>
                    </div>
                    {/* Address */}
                    <div className="contact-method">
                        <i className="fa-solid fa-location-dot"></i>
                        <h4>Address</h4>
                        <p>123 SmartSwap Ave, Tech City, 12345</p>
                    </div>
                    {/* Working Hours */}
                    <div className="contact-method">
                        <i className="fa-solid fa-clock"></i>
                        <h4>Working Hours</h4>
                        <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
                    </div>
                </div>
            </div>

            {/* Support Commitment Section */}
            <div className="contacts-section">
                <h3>We're Here for You</h3>
                <p className="contacts-text">
                    Our support team is dedicated to providing you with the best experience possible. Whether you have a technical issue, a question about your account, or want to share your thoughts, don't hesitate to contact us!
                </p>
            </div>

            {/* Navigation back to home */}
            <div className="contacts-button-container">
                <button className="contacts-back-button" onClick={() => navigate("/")}>Back to Home</button>
            </div>
        </div>
    );
}

export default React.memo(Contacts);