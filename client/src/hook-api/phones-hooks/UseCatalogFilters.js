// Custom hook for handling catalog filtering functionality

import { useState, useCallback } from 'react';

export const useCatalogFilters = (handleFilter, resetPagination) => {
    // State for filter selections
    const [selectedBrand, setSelectedBrand] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedMemory, setSelectedMemory] = useState("");
    const [selectedPriceRange, setSelectedPriceRange] = useState("");

    // Handle filter change with pagination reset
    const handleFilterChange = useCallback((type, value, setter) => {
        // Update the filter state
        setter(value);
        
        // Apply the filter
        handleFilter(type, value);
        
        // Reset pagination to first page when filter changes
        resetPagination();
    }, [handleFilter, resetPagination]);

    // Handle brand filter change
    const handleBrandChange = useCallback((value) => {
        handleFilterChange('brand', value, setSelectedBrand);
    }, [handleFilterChange]);

    // Handle color filter change
    const handleColorChange = useCallback((value) => {
        handleFilterChange('color', value, setSelectedColor);
    }, [handleFilterChange]);

    // Handle memory filter change
    const handleMemoryChange = useCallback((value) => {
        handleFilterChange('memory', value, setSelectedMemory);
    }, [handleFilterChange]);

    // Handle price range filter change
    const handlePriceRangeChange = useCallback((value) => {
        handleFilterChange('priceRange', value, setSelectedPriceRange);
    }, [handleFilterChange]);

    // Reset all filters
    const resetFilters = useCallback(() => {
        setSelectedBrand("");
        setSelectedColor("");
        setSelectedMemory("");
        setSelectedPriceRange("");
        
        // Reset all filters in the parent hook
        handleFilter('brand', "");
        handleFilter('color', "");
        handleFilter('memory', "");
        handleFilter('priceRange', "");
        
        // Reset pagination
        resetPagination();
    }, [handleFilter, resetPagination]);

    // Return filter state and handlers
    return {
        // Filter state
        selectedBrand,
        selectedColor,
        selectedMemory,
        selectedPriceRange,
        
        // Handlers
        handleBrandChange,
        handleColorChange,
        handleMemoryChange,
        handlePriceRangeChange,
        resetFilters
    };
};