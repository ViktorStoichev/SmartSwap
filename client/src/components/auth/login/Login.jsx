// Login component for user authentication

import { Link } from "react-router-dom";
import './Login.css'
import { useLogin } from "../../../hook-api/auth-hooks/UseLogin";

const Login = () => {
    // Destructure all form state and handlers from the custom login hook
    const { 
        email, 
        setEmail, 
        password, 
        setPassword, 
        error, 
        rememberMe, 
        setRememberMe, 
        handleLogin 
    } = useLogin();

    return (
        <div className="login-container">
            {/* Main login page header */}
            <h2 className="login-title">Welcome Back!</h2>
            <p className="login-subtitle">Sign in to continue to SmartSwap</p>
            
            {/* Display error message if login fails */}
            {error && <p className="error-message">{error}</p>}
            
            {/* Login form with submission handler */}
            <form className="login-form" onSubmit={handleLogin}>
                {/* Email input field with change handler */}
                <div className="input-group">
                    <label htmlFor="email" className="input-label">Email</label>
                    <input
                        id="email"
                        type="email"
                        className="input-field"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                {/* Password input field with change handler */}
                <div className="input-group">
                    <label htmlFor="password" className="input-label">Password</label>
                    <input
                        id="password"
                        type="password"
                        className="input-field"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {/* Remember me checkbox and forgot password link */}
                <div className="form-options">
                    <label className="remember-me">
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <span>Remember me</span>
                    </label>
                    <Link to="/forgot-password" className="forgot-password">Forgot Password?</Link>
                </div>

                {/* Submit button for login form */}
                <button className="submit-button" type="submit">
                    Sign In
                </button>

                {/* Link to registration page for new users */}
                <div className="register-link">
                    Don't have an account? <Link to="/register">Register here</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
