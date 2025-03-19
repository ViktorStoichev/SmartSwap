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
    }
}