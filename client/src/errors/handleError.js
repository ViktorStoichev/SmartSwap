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
            }, 100);
        } else {
            setVisibleErrors((prev) => ({ ...prev, [name]: false }));
        }
    };

    const handlePhoneDataError = (e) => {
        const { name, value, files } = e.target;
        let val = value;
        if (name === "images") {
            // If files exist, use their length, else use value
            val = files ? files.length > 0 ? Array.from(files) : [] : value;
        }
        const errorMessage = validators.phone(name, val);
    
        setErrors((prev) => ({ ...prev, [name]: errorMessage }));
    
        if (errorMessage) {
            setTimeout(() => {
                setVisibleErrors((prev) => ({ ...prev, [name]: true }));
            }, 100);
        } else {
            setVisibleErrors((prev) => ({ ...prev, [name]: false }));
        }
    };

    const handleImagesError = (allImages) => {
        const errorMessage = validators.phone("images", allImages);
        setErrors((prev) => ({ ...prev, images: errorMessage }));
        if (errorMessage) {
            setTimeout(() => {
                setVisibleErrors((prev) => ({ ...prev, images: true }));
            }, 100);
        } else {
            setVisibleErrors((prev) => ({ ...prev, images: false }));
        }
    };

    return { errors, visibleErrors, handleRegisterError, handlePhoneDataError, handleImagesError };
}