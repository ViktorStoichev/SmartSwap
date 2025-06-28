// Custom hook for handling Details component actions and modal functionality

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { approvePhone, rejectPhone } from '../../services/get-phones-services/phoneService';

export const useDetailsActions = (productId, images) => {
    // State for modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Loading states to track admin actions
    const [isApproving, setIsApproving] = useState(false);
    const [isRejecting, setIsRejecting] = useState(false);
    
    // React Router navigation hook
    const navigate = useNavigate();

    // Handle phone approval by admin
    const handleApprove = async () => {
        setIsApproving(true);
        
        try {
            await approvePhone(productId);
            navigate('/phones');
        } catch (error) {
            console.error('Error approving phone:', error);
            throw error; // Re-throw to allow error handling in calling component
        } finally {
            setIsApproving(false);
        }
    };

    // Handle phone rejection by admin
    const handleReject = async () => {
        setIsRejecting(true);
        
        try {
            await rejectPhone(productId, images);
            navigate('/phones');
        } catch (error) {
            console.error('Error rejecting phone:', error);
            throw error; // Re-throw to allow error handling in calling component
        } finally {
            setIsRejecting(false);
        }
    };

    // Open confirmation modal
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Close confirmation modal
    const closeModal = () => {
        if (!isApproving && !isRejecting) {
            setIsModalOpen(false);
        }
    };

    // Return modal state and action handlers
    return {
        // Modal state
        isModalOpen,
        
        // Loading states
        isApproving,
        isRejecting,
        
        // Handlers
        handleApprove,
        handleReject,
        openModal,
        closeModal
    };
}; 