import { useNavigate } from "react-router-dom";
import './About.css';

export default function About() {
    const navigate = useNavigate();

    return (
        <div className="about-container">
            <h2 className="about-title">About This Application</h2>
            <p className="about-text">
                Welcome to our marketplace for second-hand phones! Here, you can
                easily buy and sell used smartphones, connect with other users, and
                find great deals on pre-owned devices.
            </p>
            <p className="about-text">
                Our goal is to provide a secure and user-friendly platform where
                you can trade smartphones effortlessly, making it easier for you to
                find the phone you need at an affordable price.
            </p>
            <button className="back-button" onClick={() => navigate("/")}>
                Back to Home
            </button>
        </div>
    );
};