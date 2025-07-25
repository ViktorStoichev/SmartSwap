import React, { useMemo, useCallback } from "react";
import Loader from "../../main/loader/Loader.jsx";
import './Catalog.css'
import { usePhones } from "../../../hook-api/phones-hooks/UsePhones.js";
import { usePagination } from "../../../hook-api/phones-hooks/UsePagination.js";
import { useCatalogFilters } from "../../../hook-api/phones-hooks/UseCatalogFilters.js";
import PhoneTemplate from "../phone-template/PhoneTemplate.jsx";
import Pagination from "./Pagination.jsx";

function Catalog() {
    // Get phone data and filtering functionality from the main hook
    const { 
        filteredProducts, 
        brands, 
        colors,
        memories,
        handleFilter,
        isLoading
    } = usePhones();
    
    // Get pagination functionality
    const {
        currentPage,
        currentItems,
        totalPages,
        pageNumbers,
        startPage,
        endPage,
        handlePageChange,
        resetToFirstPage
    } = usePagination(filteredProducts);
    
    // Get filter functionality
    const {
        selectedBrand,
        selectedColor,
        selectedMemory,
        selectedPriceRange,
        handleBrandChange,
        handleColorChange,
        handleMemoryChange,
        handlePriceRangeChange
    } = useCatalogFilters(handleFilter, resetToFirstPage);

    // Memoize filter option lists
    const brandOptions = useMemo(() => brands.map((brand) => (
        <option key={brand} value={brand}>
            {brand}
        </option>
    )), [brands]);

    const colorOptions = useMemo(() => colors.map((color) => (
        <option key={color} value={color}>
            {color}
        </option>
    )), [colors]);

    const memoryOptions = useMemo(() => memories.map((memory) => (
        <option key={memory} value={memory}>
            {memory}
        </option>
    )), [memories]);

    // Memoize filter change handlers
    const onBrandChange = useCallback((e) => handleBrandChange(e.target.value), [handleBrandChange]);
    const onColorChange = useCallback((e) => handleColorChange(e.target.value), [handleColorChange]);
    const onMemoryChange = useCallback((e) => handleMemoryChange(e.target.value), [handleMemoryChange]);
    const onPriceRangeChange = useCallback((e) => handlePriceRangeChange(e.target.value), [handlePriceRangeChange]);

    // Memoize rendered phone templates
    const renderedPhones = useMemo(() => (
        currentItems.map((phone) => (
            <PhoneTemplate key={phone._id} phone={phone} />
        ))
    ), [currentItems]);

    return (
        <div className="products-container">
            {/* Catalog header with title and statistics */}
            <div className="catalog-header">
                <h2 className="products-title">BROWSE SECOND-HAND PHONES FROM OUR COMMUNITY</h2>
                <p className="catalog-subtitle">Find Your Perfect Pre-Owned Smartphone</p>
                <div className="catalog-stats">
                    <div className="stat-item">
                        <i className="fa-solid fa-mobile-screen"></i>
                        <span>{filteredProducts.length} Phones Listed</span>
                    </div>
                    <div className="stat-item">
                        <i className="fa-solid fa-users"></i>
                        <span>Direct Seller Communication</span>
                    </div>
                    <div className="stat-item">
                        <i className="fa-solid fa-handshake"></i>
                        <span>Secure Transactions</span>
                    </div>
                </div>
            </div>
            
            <div className="content-wrapper">
                {/* Filter section with dropdown menus */}
                <div className="filters-section">
                    <h3 className="categories-title">Categories</h3>
                    
                    {/* Brand filter dropdown */}
                    <select 
                        value={selectedBrand} 
                        onChange={onBrandChange}
                        className="brand-select"
                    >
                        <option value="">All Brands</option>
                        {brandOptions}
                    </select>

                    {/* Color filter dropdown */}
                    <select 
                        value={selectedColor} 
                        onChange={onColorChange}
                        className="brand-select"
                    >
                        <option value="">All Colors</option>
                        {colorOptions}
                    </select>

                    {/* Memory filter dropdown */}
                    <select 
                        value={selectedMemory} 
                        onChange={onMemoryChange}
                        className="brand-select"
                    >
                        <option value="">All Memory Options</option>
                        {memoryOptions}
                    </select>

                    {/* Price range filter dropdown */}
                    <select 
                        value={selectedPriceRange} 
                        onChange={onPriceRangeChange}
                        className="brand-select"
                    >
                        <option value="">All Prices</option>
                        <option value="0-399">$0 - $399</option>
                        <option value="400-799">$400 - $799</option>
                        <option value="800-1199">$800 - $1,199</option>
                        <option value="1200-1599">$1,200 - $1,599</option>
                        <option value="1600-2000">$1,600 - $2,000</option>
                        <option value="2000-999999">$2,000+</option>
                    </select>
                </div>

                {/* Products section with grid and pagination */}
                <div className="products-section">
                    {/* Products grid */}
                    <div className="products-grid">
                        {isLoading ? (
                            <Loader />
                        ) : currentItems.length > 0 ? (
                            /* Render phone templates for current page */
                            renderedPhones
                        ) : (
                            /* Empty state when no products found */
                            <div className="no-products">
                                <i className="fa-solid fa-mobile-screen"></i>
                                <h3>No Products Found</h3>
                                <p>Try adjusting your filters to see more results</p>
                            </div>
                        )}
                    </div>
                    
                    {/* Pagination component */}
                    {!isLoading && (
                        <Pagination 
                            currentPage={currentPage}
                            totalPages={totalPages}
                            pageNumbers={pageNumbers}
                            startPage={startPage}
                            endPage={endPage}
                            onPageChange={handlePageChange}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default React.memo(Catalog);
