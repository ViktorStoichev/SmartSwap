// Custom hook for managing image handling in EditPhone component

import { useState, useEffect, useCallback } from 'react';
import { uploadImage, deleteImage } from '../../services/image-services/photoService';

export const useEditImageManager = (editedProductImages) => {
    // State for managing images
    const [images, setImages] = useState([]); // Start empty, will be set in useEffect
    const [pendingImages, setPendingImages] = useState([]); // holds File objects
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState("");
    const [originalImages, setOriginalImages] = useState([]);

    // Initialize images when editedProduct.images changes
    useEffect(() => {
        if (editedProductImages && Array.isArray(editedProductImages)) {
            setOriginalImages(editedProductImages);
            setImages(editedProductImages); // Set current images for display
        }
    }, [editedProductImages]);

    // Memoized image change handler
    const handleImageChange = useCallback((e) => {
        const files = Array.from(e.target.files);
        if (files.length + images.length + pendingImages.length > 7) {
            setUploadError("You can upload up to 7 images.");
            return;
        }
        setUploadError("");
        setPendingImages((prev) => [...prev, ...files].slice(0, 7 - images.length));
    }, [images, pendingImages.length]);

    // Memoized remove image handler
    const handleRemoveImage = useCallback(async (idx, isPending = false) => {
        if (isPending) {
            setPendingImages((prev) => prev.filter((_, i) => i !== idx));
        } else {
            setImages((prev) => prev.filter((_, i) => i !== idx));
        }
    }, []);

    // Memoized upload handler
    const uploadPendingImages = useCallback(async (formData, handleEditSubmit) => {
        setUploading(true);
        setUploadError("");
        try {
            // Upload all pending images
            const uploaded = [];
            for (const file of pendingImages) {
                const data = await uploadImage(file);
                uploaded.push(data);
            }
            const allImages = [...images, ...uploaded];
            formData.set("images", JSON.stringify(allImages));
            
            // Submit the edited phone data
            await handleEditSubmit(allImages);
            
            // Delete removed images from Cloudinary
            const removedImages = originalImages.filter(
                orig => !allImages.some(img => img.public_id === orig.public_id)
            );
            for (const img of removedImages) {
                if (img.public_id) {
                    try {
                        await deleteImage(img.public_id);
                    } catch {}
                }
            }
            setImages(allImages); // update images state
            setPendingImages([]); // clear pending
            setOriginalImages(allImages); // update for next edit
            return true;
        } catch (err) {
            console.error('Error during image upload or phone editing:', err);
            setUploadError("Failed to upload image(s) or update listing. Please try again.");
            return false;
        } finally {
            setUploading(false);
        }
    }, [pendingImages, images, originalImages]);

    // Memoized getter for all images
    const getAllImages = useCallback(() => {
        return [...images, ...pendingImages];
    }, [images, pendingImages]);

    return {
        // State
        images,
        pendingImages,
        uploading,
        uploadError,
        
        // Handlers
        handleImageChange,
        handleRemoveImage,
        uploadPendingImages,
        getAllImages
    };
};