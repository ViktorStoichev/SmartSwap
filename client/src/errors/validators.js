export const validators = {
    register: (name, value, password) => {
        switch (name) {
            case "email":
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "Please enter a valid email address";
            case "password":
                return value.length >= 6 ? "" : "Password must be at least 6 characters";
            case "repeatPassword":
                return value === password ? "" : "Passwords do not match";
            case "username":
                return value.trim().length >= 3 ? "" : "Username must be at least 3 characters";
            case "address":
                return value.trim().length >= 5 ? "" : "Address must be at least 5 characters";
            case "avatarUrl":
                return /^(https?:\/\/)/.test(value) ? "" : "Avatar URL must start with http:// or https://";
            default:
                return "";
        }
    },
    phone: (name, value) => {
        switch (name) {
            case "title":
                return value.trim().length >= 6 ? "" : "Title must be at least 6 characters";
            case "price":
                return value > 0 ? "" : "Price must be a positive number";
            case "description":
                return value.trim().length >= 10 ? "" : "Description must be at least 10 characters";
            case "brand":
                return value ? "" : "Please select a brand";
            case "model":
                return value.trim().length >= 2 ? "" : "Model must be at least 2 characters";
            case "color":
                return value ? "" : "Please select a color";
            case "memory":
                return value ? "" : "Please select memory capacity";
            case "quality":
                return value ? "" : "Please select phone quality";
            case "images":
                if (!value || (Array.isArray(value) && value.length === 0) || value === "[]" || value === "") {
                    return "Upload at least one image";
                }
                return "";
            default:
                return "";
        }
    }
}