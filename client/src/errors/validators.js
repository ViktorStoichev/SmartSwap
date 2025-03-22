export const validators = {
    register: (name, value, password) => {
        switch (name) {
            case "email":
                return /\S+@\S+\.\S+/.test(value) ? "" : "Invalid email format";
            case "password":
                return value.length >= 6 ? "" : "Password must be at least 6 characters";
            case "repeatPassword":
                return value === password ? "" : "Passwords do not match";
            case "username":
                return value.trim().length >= 3 ? "" : "Username must be at least 3 characters";
            case "address":
                return value.trim().length >= 3 ? "" : "Address must be at least 3 characters";
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
            case "imageUrl":
                return /^(https?:\/\/)/.test(value) ? "" : "Image URL must start with http:// or https://";
            case "price":
                return value > 0 ? "" : "Price must be a positive number";
            case "description":
                return value.trim().length >= 10 ? "" : "Description must be at least 10 characters";
            default:
                return "";
        }
    }
}