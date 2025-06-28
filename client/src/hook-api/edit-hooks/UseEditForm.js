// Custom hook for managing form handling in EditPhone component

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkProfanity, showProfanityAlert } from '../../utils/profanityCheck';

export const useEditForm = (id, handleEditChange) => {
    // State for form management
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // React Router navigation hook
    const navigate = useNavigate();

    // Handle input changes with profanity check
    const handleInputChange = (e) => {
        const { value, name } = e.target;
        if (checkProfanity(value)) {
            showProfanityAlert();
            e.target.value = '';
            return;
        }
        handleEditChange(e);
    };

    // Handle form submission
    const onFormSubmit = (e, images) => {
        e.preventDefault();
        const form = new FormData(e.target);
        form.append("images", JSON.stringify(images));
        setFormData(form);
        setIsModalOpen(true);
    };

    // Handle confirmation and final submission
    const handleConfirm = async (uploadPendingImages, handleEditSubmit) => {
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
    };

    // Close modal
    const closeModal = () => {
        if (!isSubmitting) {
            setIsModalOpen(false);
        }
    };

    // Navigate back to phone details
    const handleCancel = () => {
        navigate(`/phones/${id}`);
    };

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