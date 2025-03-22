import { useState } from "react";
import { validators } from "./validators";

export const useErrorHandler = () => {
    const [errors, setErrors] = useState({});
    const [visibleErrors, setVisibleErrors] = useState({});

    const handleRegisterError = (e) => {
        const { name, value, form } = e.target;
        const passwordValue = form.password?.value;
        const errorMessage = validators.register(name, value, passwordValue);
    
        setErrors((prev) => ({ ...prev, [name]: errorMessage }));
    
        if (errorMessage) {
            setTimeout(() => {
                setVisibleErrors((prev) => ({ ...prev, [name]: true }));
            }, 100); // Малко забавяне преди грешката да стане видима
        } else {
            setVisibleErrors((prev) => ({ ...prev, [name]: false }));
        }
    };

    const handlePhoneDataError = (e) => {
        const { name, value } = e.target;
        const errorMessage = validators.phone(name, value);
    
        setErrors((prev) => ({ ...prev, [name]: errorMessage }));
    
        if (errorMessage) {
            setTimeout(() => {
                setVisibleErrors((prev) => ({ ...prev, [name]: true }));
            }, 100); // Малко забавяне преди грешката да стане видима
        } else {
            setVisibleErrors((prev) => ({ ...prev, [name]: false }));
        }
    };

    return { errors, visibleErrors, handleRegisterError, handlePhoneDataError };
}