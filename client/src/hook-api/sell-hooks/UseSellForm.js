// Custom hook for managing form handling in SellPhone component
// Handles form submission, modal state, and input validation

import { useState, useCallback } from 'react';
import { checkProfanity, showProfanityAlert } from '../../utils/profanityCheck';

export const useSellForm = () => {
    // State for modal and form data management
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle input changes with profanity filtering
    const handleInputChange = useCallback((e) => {
        const { value, name } = e.target;
        // Check for profanity and clear input if detected
        if (checkProfanity(value)) {
            showProfanityAlert();
            e.target.value = '';
        }
    }, []);

    // Handle form submission and prepare for confirmation
    const onFormSubmit = useCallback((e, images) => {
        e.preventDefault();
        const form = new FormData(e.target);
        // Add current images to form data
        form.append("images", JSON.stringify(images));
        setFormData(form);
        setIsModalOpen(true);
    }, []);

    // Handle confirmation and final submission with image upload
    const handleConfirm = useCallback(async (uploadPendingImages, createAction) => {
        if (!formData) return;
        
        setIsSubmitting(true);
        try {
            const success = await uploadPendingImages(formData, createAction);
            if (success) {
                setIsModalOpen(false);
            }
        } catch (error) {
            console.error('Error during form submission:', error);
        } finally {
            setIsSubmitting(false);
        }
    }, [formData]);

    // Close confirmation modal
    const closeModal = useCallback(() => {
        if (!isSubmitting) {
            setIsModalOpen(false);
        }
    }, [isSubmitting]);

    return {
        // State
        isModalOpen,
        isSubmitting,
        
        // Handlers
        handleInputChange,
        onFormSubmit,
        handleConfirm,
        closeModal
    };
};