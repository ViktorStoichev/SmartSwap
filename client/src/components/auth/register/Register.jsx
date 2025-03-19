import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useActionState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../../server/firebase";
import "./Register.css";
import { useRegister } from "../../../hook-api/UseRegister";
import { useErrorHandler } from "../../../errors/handleError";

const registerAction = async (prevState, formData) => {
    const { email, password, repeatPassword, username, address, avatarUrl } = Object.fromEntries(formData);

    if (password !== repeatPassword) {
        return { error: "Passwords do not match!" };
    }

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
    // const [errors, setErrors] = useState({});
    // const [visibleErrors, setVisibleErrors] = useState({});
    const { errors, visibleErrors, handleError } = useErrorHandler();

    useEffect(() => {
        if (state.success) {
            navigate("/");
        }
    }, [state.success, navigate]);

    // const handleBlur = (e) => {
    //     const { name, value, form } = e.target;
    //     const passwordValue = form.password?.value;
    //     const errorMessage = validateField(name, value, passwordValue);

    //     setErrors((prev) => ({ ...prev, [name]: errorMessage }));

    //     if (errorMessage) {
    //         setTimeout(() => {
    //             setVisibleErrors((prev) => ({ ...prev, [name]: true }));
    //         }, 100); // Малко забавяне преди грешката да стане видима
    //     } else {
    //         setVisibleErrors((prev) => ({ ...prev, [name]: false }));
    //     }
    // };

    return (
        <div className="register-container">
            <h2 className="register-title">Registration</h2>
            {state.error && <div className="error-message">{state.error}</div>}
            <form action={dispatch} className="register-form">
                <div className="input-group">
                    <input type="email" name="email" className="input-field" placeholder="Email" required onBlur={handleError} />
                    {errors.email && <span className={`error-text ${visibleErrors.email ? "show" : ""}`}>{errors.email}</span>}
                </div>

                <div className="input-group">
                    <input type="text" name="username" className="input-field" placeholder="Username" required onBlur={handleError} />
                    {errors.username && <span className={`error-text ${visibleErrors.username ? "show" : ""}`}>{errors.username}</span>}
                </div>

                <div className="input-group">
                    <input type="text" name="address" className="input-field" placeholder="Personal address" required onBlur={handleError} />
                    {errors.address && <span className={`error-text ${visibleErrors.address ? "show" : ""}`}>{errors.address}</span>}
                </div>

                <div className="input-group">
                    <input type="url" name="avatarUrl" className="input-field" placeholder="Avatar URL" required onBlur={handleError} />
                    {errors.avatarUrl && <span className={`error-text ${visibleErrors.avatarUrl ? "show" : ""}`}>{errors.avatarUrl}</span>}
                </div>

                <div className="input-group">
                    <input type="password" name="password" className="input-field" placeholder="Password" required onBlur={handleError} />
                    {errors.password && <span className={`error-text ${visibleErrors.password ? "show" : ""}`}>{errors.password}</span>}
                </div>

                <div className="input-group">
                    <input type="password" name="repeatPassword" className="input-field" placeholder="Repeat Password" required onBlur={handleError} />
                    {errors.repeatPassword && <span className={`error-text ${visibleErrors.repeatPassword ? "show" : ""}`}>{errors.repeatPassword}</span>}
                </div>

                <button type="submit" className="submit-button">Register</button>
            </form>
        </div>
    );
};

export default Register;
