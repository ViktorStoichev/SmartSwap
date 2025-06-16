import './404.css';
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <h1 className="notfound-title">404</h1>
        <h2 className="notfound-subtitle">Page Not Found</h2>
        <p className="notfound-text">
          Oops! The page you're looking for seems to have vanished into thin air.
        </p>
        <p className="notfound-suggestion">
          Don't worry! You can either:
        </p>
        <ul className="notfound-options">
          <li>Go back to the home page</li>
          <li>Check if the URL is correct</li>
          <li>Try searching for what you need</li>
        </ul>
        <div className="notfound-button-container">
          <button className="notfound-back-button" onClick={() => navigate("/")}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};