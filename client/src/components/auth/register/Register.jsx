import { Link } from "react-router-dom";
import "./Register.css";
import { useRegister } from "../../../hook-api/auth-hooks/UseRegister";

const Register = () => {
    // Get all form state and handlers from the custom registration hook
    const { 
        state, 
        dispatch, 
        termsAgreed, 
        setTermsAgreed, 
        errors, 
        visibleErrors, 
        handleRegisterError, 
        handleInputChange, 
        isFormValid 
    } = useRegister();

    return (
        <div className="register-container">
            {/* Registration page header */}
            <h2 className="register-title">Create Account</h2>
            <p className="register-subtitle">Join our community of phone traders</p>

            {/* Registration form with useActionState dispatch */}
            <form action={dispatch} className="register-form">
                {/* Email input field with validation and profanity checking */}
                <div className="input-group">
                    <label htmlFor="email" className="input-label">Email</label>
                    <input 
                        id="email"
                        type="email" 
                        name="email" 
                        className="input-field" 
                        placeholder="Enter your email" 
                        required 
                        onBlur={handleRegisterError}
                        onChange={handleInputChange}
                    />
                    {errors.email && <span className={`error-text ${visibleErrors.email ? "show" : ""}`}>{errors.email}</span>}
                </div>

                {/* Username input field with validation and profanity checking */}
                <div className="input-group">
                    <label htmlFor="username" className="input-label">Username</label>
                    <input 
                        id="username"
                        type="text" 
                        name="username" 
                        className="input-field" 
                        placeholder="Choose a username" 
                        required 
                        onBlur={handleRegisterError}
                        onChange={handleInputChange}
                    />
                    {errors.username && <span className={`error-text ${visibleErrors.username ? "show" : ""}`}>{errors.username}</span>}
                </div>

                {/* Address input field with validation and profanity checking */}
                <div className="input-group">
                    <label htmlFor="address" className="input-label">Address</label>
                    <input 
                        id="address"
                        type="text" 
                        name="address" 
                        className="input-field" 
                        placeholder="Enter your address" 
                        required 
                        onBlur={handleRegisterError}
                        onChange={handleInputChange}
                    />
                    {errors.address && <span className={`error-text ${visibleErrors.address ? "show" : ""}`}>{errors.address}</span>}
                </div>

                {/* Profile picture URL input field with validation */}
                <div className="input-group">
                    <label htmlFor="avatarUrl" className="input-label">Profile Picture</label>
                    <input 
                        id="avatarUrl"
                        type="url" 
                        name="avatarUrl" 
                        className="input-field" 
                        placeholder="Enter image URL for your profile" 
                        required 
                        onBlur={handleRegisterError}
                        onChange={handleInputChange}
                    />
                    {errors.avatarUrl && <span className={`error-text ${visibleErrors.avatarUrl ? "show" : ""}`}>{errors.avatarUrl}</span>}
                </div>

                {/* Password input field with validation */}
                <div className="input-group">
                    <label htmlFor="password" className="input-label">Password</label>
                    <input 
                        id="password"
                        type="password" 
                        name="password" 
                        className="input-field" 
                        placeholder="Create a strong password" 
                        required 
                        onBlur={handleRegisterError}
                        onChange={handleInputChange}
                    />
                    {errors.password && <span className={`error-text ${visibleErrors.password ? "show" : ""}`}>{errors.password}</span>}
                </div>

                {/* Confirm password input field with validation */}
                <div className="input-group">
                    <label htmlFor="repeatPassword" className="input-label">Confirm Password</label>
                    <input 
                        id="repeatPassword"
                        type="password" 
                        name="repeatPassword" 
                        className="input-field" 
                        placeholder="Repeat your password" 
                        required 
                        onBlur={handleRegisterError}
                        onChange={handleInputChange}
                    />
                    {errors.repeatPassword && <span className={`error-text ${visibleErrors.repeatPassword ? "show" : ""}`}>{errors.repeatPassword}</span>}
                </div>

                {/* Terms and conditions agreement section */}
                <div className="terms-section">
                    <label className="terms-checkbox">
                        <input 
                            type="checkbox" 
                            required 
                            checked={termsAgreed}
                            onChange={(e) => setTermsAgreed(e.target.checked)}
                        />
                        <span>I agree to the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link></span>
                    </label>
                </div>

                {/* Submit button with dynamic styling based on form validity */}
                <button 
                    type="submit" 
                    className="submit-button" 
                    style={{ backgroundColor: !isFormValid ? "grey" : "" }}
                    disabled={!isFormValid}
                >
                    Create Account
                </button>

                {/* Link to login page for existing users */}
                <div className="login-link">
                    Already have an account? <Link to="/login">Sign in here</Link>
                </div>
            </form>
        </div>
    );
};

export default Register;
