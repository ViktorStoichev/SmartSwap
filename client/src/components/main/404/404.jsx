import './404.css';
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <h2 className="notfound-title">404 - Page Not Found</h2>
      <p className="notfound-text">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <button className="back-button" onClick={() => navigate("/")}>
        Go to Home
      </button>
    </div>
  );
};