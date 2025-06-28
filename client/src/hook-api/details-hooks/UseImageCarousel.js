// Custom hook for handling image carousel functionality

import { useState, useMemo } from 'react';
import { parseProductImages, calculateMaxImages, getPreviousImage, getNextImage } from '../../services/image-services/imageCarouselService';

export const useImageCarousel = (productImages) => {
    // State for current image index
    const [currentImage, setCurrentImage] = useState(0);

    // Parse and process product images using the service
    const images = useMemo(() => {
        return parseProductImages(productImages);
    }, [productImages]);

    // Calculate maximum number of images to display
    const maxImages = useMemo(() => {
        return calculateMaxImages(images);
    }, [images]);

    // Navigate to previous image
    const handlePrev = () => {
        setCurrentImage((prev) => getPreviousImage(prev, maxImages));
    };

    // Navigate to next image
    const handleNext = () => {
        setCurrentImage((prev) => getNextImage(prev, maxImages));
    };

    // Return carousel data and handlers
    return {
        // Carousel data
        images,
        currentImage,
        maxImages,
        
        // Handlers
        handlePrev,
        handleNext
    };
}; 