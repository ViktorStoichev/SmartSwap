// Form Validation Rules
// Contains validation functions for registration and phone listing forms
// Returns error messages for invalid inputs or empty string for valid inputs

export const validators = {
    // Registration form validation rules
    register: (name, value, password) => {
        switch (name) {
            case "email":
                // Validate email format using regex pattern
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "Please enter a valid email address";
            
            case "password":
                // Ensure password is at least 6 characters long
                return value.length >= 6 ? "" : "Password must be at least 6 characters";
            
            case "repeatPassword":
                // Ensure password confirmation matches the original password
                return value === password ? "" : "Passwords do not match";
            
            case "username":
                // Ensure username is at least 3 characters (trimmed)
                return value.trim().length >= 3 ? "" : "Username must be at least 3 characters";
            
            case "address":
                // Ensure address is at least 5 characters (trimmed)
                return value.trim().length >= 5 ? "" : "Address must be at least 5 characters";
            
            case "avatarUrl":
                // Validate avatar URL starts with http:// or https://
                return /^(https?:\/\/)/.test(value) ? "" : "Avatar URL must start with http:// or https://";
            
            default:
                return "";
        }
    },
    
    // Phone listing form validation rules
    phone: (name, value) => {
        switch (name) {
            case "title":
                // Ensure title is at least 6 characters (trimmed)
                return value.trim().length >= 6 ? "" : "Title must be at least 6 characters";
            
            case "price":
                // Ensure price is a positive number
                return value > 0 ? "" : "Price must be a positive number";
            
            case "description":
                // Ensure description is at least 10 characters (trimmed)
                return value.trim().length >= 10 ? "" : "Description must be at least 10 characters";
            
            case "brand":
                // Ensure brand is selected (not empty)
                return value ? "" : "Please select a brand";
            
            case "model":
                // Ensure model is at least 2 characters (trimmed)
                return value.trim().length >= 2 ? "" : "Model must be at least 2 characters";
            
            case "color":
                // Ensure color is selected (not empty)
                return value ? "" : "Please select a color";
            
            case "memory":
                // Ensure memory capacity is selected (not empty)
                return value ? "" : "Please select memory capacity";
            
            case "quality":
                // Ensure phone quality is selected (not empty)
                return value ? "" : "Please select phone quality";
            
            case "images":
                // Validate that at least one image is uploaded
                // Check for various empty states: null, empty array, empty string, or "[]"
                if (!value || (Array.isArray(value) && value.length === 0) || value === "[]" || value === "") {
                    return "Upload at least one image";
                }
                return "";
            
            default:
                return "";
        }
    }
}