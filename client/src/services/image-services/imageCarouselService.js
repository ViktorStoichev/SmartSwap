// Service for handling image carousel functionality

// Parse product images from different formats
export const parseProductImages = (productImages) => {
    let parsedImages = [];
    
    // Handle string format (JSON)
    if (typeof productImages === "string") {
        try {
            parsedImages = JSON.parse(productImages);
        } catch {
            parsedImages = [];
        }
    } 
    // Handle array format
    else if (Array.isArray(productImages)) {
        parsedImages = productImages;
    }
    
    // Ensure we have a valid array and at least one image
    const images = parsedImages && Array.isArray(parsedImages) && parsedImages.length > 0 
        ? parsedImages 
        : [{ url: null }];
    
    return images;
};

// Calculate maximum number of images to display
export const calculateMaxImages = (images, maxLimit = 7) => {
    return Math.min(images.length, maxLimit);
};

// Navigate to previous image in carousel
export const getPreviousImage = (currentIndex, maxImages) => {
    return (currentIndex - 1 + maxImages) % maxImages;
};

// Navigate to next image in carousel
export const getNextImage = (currentIndex, maxImages) => {
    return (currentIndex + 1) % maxImages;
}; 