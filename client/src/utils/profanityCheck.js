import leoProfanity from 'leo-profanity';

// Get the list of bad words
const badWords = leoProfanity.list();

export const checkProfanity = (text) => {
    if (!text) return false;
    
    // Convert text to lowercase for case-insensitive matching
    const lowerText = text.toLowerCase();
    
    // Remove all non-letter characters (special characters and numbers)
    const cleanText = lowerText.replace(/[^a-z]/g, '');
    
    // Check if any bad word is contained within the cleaned text
    return badWords.some(word => {
        // Create a regex pattern that matches the word with any characters before or after
        const pattern = new RegExp(`\\b${word}\\b|${word}`, 'i');
        return pattern.test(cleanText);
    });
};

export const showProfanityAlert = () => {
    alert("Please keep your content appropriate and professional. Inappropriate language is not allowed.");
}; 