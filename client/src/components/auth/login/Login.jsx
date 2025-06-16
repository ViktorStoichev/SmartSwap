import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import './Login.css'
import { useLogin } from "../../../hook-api/UseLogin";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();
    const { login } = useLogin();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            await login(email, password);
            setError("");
            navigate('/');
        } catch (err) {
            setError("Wrong email or password!");
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-title">Welcome Back!</h2>
            <p className="login-subtitle">Sign in to continue to SmartSwap</p>
            
            {error && <p className="error-message">{error}</p>}
            
            <form className="login-form" onSubmit={handleLogin}>
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

                <button className="submit-button" type="submit">
                    Sign In
                </button>

                <div className="register-link">
                    Don't have an account? <Link to="/register">Register here</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
