// Profanity Filtering Utility
// Provides content filtering to maintain appropriate language in user inputs
// Uses leo-profanity library for comprehensive bad word detection

import leoProfanity from 'leo-profanity';

// Get the comprehensive list of bad words from the library
const badWords = leoProfanity.list();

// Check if text contains inappropriate language
export const checkProfanity = (text) => {
    // Return false if text is empty or null
    if (!text) return false;
    
    // Convert text to lowercase for case-insensitive matching
    const lowerText = text.toLowerCase();
    
    // Remove all non-letter characters (special characters and numbers)
    // This prevents bypassing filters with special characters
    const cleanText = lowerText.replace(/[^a-z]/g, '');
    
    // Check if any bad word is contained within the cleaned text
    return badWords.some(word => {
        // Create a regex pattern that matches the word with word boundaries or as substring
        // 'i' flag makes the pattern case-insensitive
        const pattern = new RegExp(`\\b${word}\\b|${word}`, 'i');
        return pattern.test(cleanText);
    });
};

// Display alert to user when inappropriate content is detected
export const showProfanityAlert = () => {
    alert("Please keep your content appropriate and professional. Inappropriate language is not allowed.");
}; 