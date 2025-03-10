import { useNavigate } from "react-router-dom";
import './About.css';

export default function About() {
    const navigate = useNavigate();

    return (
        <div className="about-container">
            <h2 className="about-title">About This Application</h2>
            <p className="about-text">
                Welcome to our marketplace for second-hand products! Here, you can
                easily buy and sell items, connect with other users, and find great
                deals on pre-owned products.
            </p>
            <p className="about-text">
                Our goal is to create a secure and user-friendly platform where people
                can trade products effortlessly.
            </p>
            <button className="back-button" onClick={() => navigate("/")}>
                Back to Home
            </button>
        </div>
    );
};