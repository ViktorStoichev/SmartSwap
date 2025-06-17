import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useActionState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../../server/firebase";
import "./Register.css";
import { useRegister } from "../../../hook-api/UseRegister";
import { useErrorHandler } from "../../../errors/handleError";
import { checkProfanity, showProfanityAlert } from "../../../utils/profanityCheck";

const registerAction = async (prevState, formData) => {
    const { email, password, repeatPassword, username, address, avatarUrl } = Object.fromEntries(formData);

    try {
        const { register } = useRegister();
        const user = await register(email, password);

        const userRef = doc(db, "users", user.uid);
        await setDoc(userRef, { uid: user.uid, email, username, address, avatarUrl });

        return { success: true };
    } catch (error) {
        return { error: error.message };
    }
};

const Register = () => {
    const navigate = useNavigate();
    const [state, dispatch] = useActionState(registerAction, { error: null, success: false });
    const { errors, visibleErrors, handleRegisterError } = useErrorHandler();
    const [termsAgreed, setTermsAgreed] = useState(false);

    const handleInputChange = (e) => {
        const { value, name } = e.target;
        if (checkProfanity(value)) {
            showProfanityAlert();
            e.target.value = '';
        }
    };

    useEffect(() => {
        if (state.success) {
            navigate("/");
        }
    }, [state.success, navigate]);

    const isFormValid = !Object.values(errors).some(Boolean) && termsAgreed;

    return (
        <div className="register-container">
            <h2 className="register-title">Create Account</h2>
            <p className="register-subtitle">Join our community of phone traders</p>

            <form action={dispatch} className="register-form">
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

                <button 
                    type="submit" 
                    className="submit-button" 
                    style={{ backgroundColor: !isFormValid ? "grey" : "" }}
                    disabled={!isFormValid}
                >
                    Create Account
                </button>

                <div className="login-link">
                    Already have an account? <Link to="/login">Sign in here</Link>
                </div>
            </form>
        </div>
    );
};

export default Register;
