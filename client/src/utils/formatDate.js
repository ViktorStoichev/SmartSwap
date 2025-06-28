// Date Formatting Utility
// Converts Date objects to human-readable format
// Returns date in "Month Day, Year" format (e.g., "January 15, 2024")

export default function formatDate(date) {
    // Format date using locale-specific formatting
    // Options: numeric day, full month name, numeric year
    return date.toLocaleDateString("en-us", { 
        day: "numeric", 
        year: "numeric", 
        month: "long" 
    });
}