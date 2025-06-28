// Custom hook for managing image handling in SellPhone component
// Handles image upload, removal, validation, and state management

import { useState } from 'react';
import { uploadImage, deleteImage } from '../../services/image-services/photoService';

export const useSellImageManager = () => {
    // State for managing images and upload process
    const [images, setImages] = useState([]);
    const [pendingImages, setPendingImages] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState("");

    // Handle image file selection with validation
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        // Validate maximum image limit (7 images total)
        if (files.length + images.length + pendingImages.length > 7) {
            setUploadError("You can upload up to 7 images.");
            return;
        }
        setUploadError("");
        // Add new files to pending images, respecting the 7-image limit
        setPendingImages((prev) => [...prev, ...files].slice(0, 7 - images.length));
    };

    // Remove image from either current images or pending images
    const handleRemoveImage = (idx, isPending = false) => {
        if (isPending) {
            // Remove from pending images (files not yet uploaded)
            setPendingImages((prev) => prev.filter((_, i) => i !== idx));
        } else {
            // Remove from uploaded images and delete from cloud storage
            const img = images[idx];
            setImages((prev) => prev.filter((_, i) => i !== idx));
            if (img && img.public_id) {
                try {
                    deleteImage(img.public_id);
                } catch {}
            }
        }
    };

    // Upload pending images and handle form submission
    const uploadPendingImages = async (formData, createAction) => {
        setUploading(true);
        setUploadError("");
        try {
            // Upload all pending images to cloud storage
            const uploaded = [];
            for (const file of pendingImages) {
                const data = await uploadImage(file);
                uploaded.push(data);
            }
            // Combine existing and newly uploaded images
            const allImages = [...images, ...uploaded];
            formData.set("images", JSON.stringify(allImages));
            
            // Create the phone listing
            await createAction(formData);
            
            // Clear state on success
            setImages(allImages);
            setPendingImages([]);
            return true;
        } catch (err) {
            console.error('Error during image upload or phone creation:', err);
            setUploadError("Failed to upload image(s) or create listing. Please try again.");
            return false;
        } finally {
            setUploading(false);
        }
    };

    // Get all current images for validation purposes
    const getAllImages = () => {
        return [...images, ...pendingImages];
    };

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