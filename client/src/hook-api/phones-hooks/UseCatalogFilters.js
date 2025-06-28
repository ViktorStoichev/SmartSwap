// Custom hook for handling catalog filtering functionality

import { useState } from 'react';

export const useCatalogFilters = (handleFilter, resetPagination) => {
    // State for filter selections
    const [selectedBrand, setSelectedBrand] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedMemory, setSelectedMemory] = useState("");
    const [selectedPriceRange, setSelectedPriceRange] = useState("");

    // Handle filter change with pagination reset
    const handleFilterChange = (type, value, setter) => {
        // Update the filter state
        setter(value);
        
        // Apply the filter
        handleFilter(type, value);
        
        // Reset pagination to first page when filter changes
        resetPagination();
    };

    // Handle brand filter change
    const handleBrandChange = (value) => {
        handleFilterChange('brand', value, setSelectedBrand);
    };

    // Handle color filter change
    const handleColorChange = (value) => {
        handleFilterChange('color', value, setSelectedColor);
    };

    // Handle memory filter change
    const handleMemoryChange = (value) => {
        handleFilterChange('memory', value, setSelectedMemory);
    };

    // Handle price range filter change
    const handlePriceRangeChange = (value) => {
        handleFilterChange('priceRange', value, setSelectedPriceRange);
    };

    // Reset all filters
    const resetFilters = () => {
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
    };

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