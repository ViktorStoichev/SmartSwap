// Custom hook for managing form handling in EditPhone component

import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkProfanity, showProfanityAlert } from '../../utils/profanityCheck';

export const useEditForm = (id, handleEditChange) => {
    // State for form management
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // React Router navigation hook
    const navigate = useNavigate();

    // Memoized input handler
    const handleInputChange = useCallback((e) => {
        const { value } = e.target;
        if (checkProfanity(value)) {
            showProfanityAlert();
            e.target.value = '';
            return;
        }
        handleEditChange(e);
    }, [handleEditChange]);

    // Memoized form submit handler
    const onFormSubmit = useCallback((e, images) => {
        e.preventDefault();
        const form = new FormData(e.target);
        form.append("images", JSON.stringify(images));
        setFormData(form);
        setIsModalOpen(true);
    }, []);

    // Memoized confirm handler
    const handleConfirm = useCallback(async (uploadPendingImages, handleEditSubmit) => {
        if (!formData) return;
        
        setIsSubmitting(true);
        try {
            const success = await uploadPendingImages(formData, handleEditSubmit);
            if (success) {
                setIsModalOpen(false);
            }
        } catch (error) {
            console.error('Error during form submission:', error);
        } finally {
            setIsSubmitting(false);
        }
    }, [formData]);

    // Memoized close modal handler
    const closeModal = useCallback(() => {
        if (!isSubmitting) {
            setIsModalOpen(false);
        }
    }, [isSubmitting]);

    // Memoized cancel handler
    const handleCancel = useCallback(() => {
        navigate(`/phones/${id}`);
    }, [navigate, id]);

    return {
        // State
        isModalOpen,
        isSubmitting,
        
        // Handlers
        handleInputChange,
        onFormSubmit,
        handleConfirm,
        closeModal,
        handleCancel
    };
};