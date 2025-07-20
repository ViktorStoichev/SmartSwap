// Custom hook for handling pagination functionality

import { useState, useMemo, useCallback } from 'react';
import { calculatePagination, generatePageNumbers, scrollToTop } from '../../services/get-phones-services/paginationService';

export const usePagination = (items, itemsPerPage = 9) => {
    // State for current page
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate pagination values using the service
    const paginationData = useMemo(() => {
        return calculatePagination(items, currentPage, itemsPerPage);
    }, [items, currentPage, itemsPerPage]);

    // Generate page numbers for display
    const pageNumbersData = useMemo(() => {
        return generatePageNumbers(currentPage, paginationData.totalPages);
    }, [currentPage, paginationData.totalPages]);

    // Handle page change
    const handlePageChange = useCallback((pageNumber) => {
        // Update current page
        setCurrentPage(pageNumber);
        
        // Scroll to top of page
        scrollToTop();
    }, []);

    // Reset to first page (useful when filters change)
    const resetToFirstPage = useCallback(() => {
        setCurrentPage(1);
    }, []);

    // Return pagination data and handlers
    return {
        // Pagination data
        currentPage,
        currentItems: paginationData.currentItems,
        totalPages: paginationData.totalPages,
        pageNumbers: pageNumbersData.pageNumbers,
        startPage: pageNumbersData.startPage,
        endPage: pageNumbersData.endPage,
        
        // Handlers
        handlePageChange,
        resetToFirstPage
    };
};