import Loader from "../../main/loader/Loader.jsx";
import './Catalog.css'
import { usePhones } from "../../../hook-api/UsePhones.js";
import PhoneTemplate from "../phone-template/PhoneTemplate.jsx";
import { useState } from "react";

export default function Catalog() {
    const { 
        filteredProducts, 
        brands, 
        colors,
        memories,
        handleFilter,
        isLoading
    } = usePhones();
    
    const [selectedBrand, setSelectedBrand] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedMemory, setSelectedMemory] = useState("");
    const [selectedPriceRange, setSelectedPriceRange] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const phonesPerPage = 9;

    const handleFilterChange = (type, value, setter) => {
        setter(value);
        handleFilter(type, value);
        setCurrentPage(1); // Reset to first page when filter changes
    };

    // Calculate pagination
    const indexOfLastPhone = currentPage * phonesPerPage;
    const indexOfFirstPhone = indexOfLastPhone - phonesPerPage;
    const currentPhones = filteredProducts.slice(indexOfFirstPhone, indexOfLastPhone);
    const totalPages = Math.ceil(filteredProducts.length / phonesPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        // Use requestAnimationFrame to ensure the scroll happens after the state update
        requestAnimationFrame(() => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    };

    const renderPagination = () => {
        const pageNumbers = [];
        const maxVisiblePages = 5;
        
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return (
            <div className="pagination">
                <button 
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="pagination-btn"
                    type="button"
                >
                    <i className="fa-solid fa-chevron-left"></i>
                </button>
                
                {startPage > 1 && (
                    <>
                        <button 
                            onClick={() => handlePageChange(1)} 
                            className="pagination-btn"
                            type="button"
                        >
                            1
                        </button>
                        {startPage > 2 && <span className="pagination-ellipsis">...</span>}
                    </>
                )}

                {pageNumbers.map(number => (
                    <button
                        key={number}
                        onClick={() => handlePageChange(number)}
                        className={`pagination-btn ${currentPage === number ? 'active' : ''}`}
                        type="button"
                    >
                        {number}
                    </button>
                ))}

                {endPage < totalPages && (
                    <>
                        {endPage < totalPages - 1 && <span className="pagination-ellipsis">...</span>}
                        <button 
                            onClick={() => handlePageChange(totalPages)} 
                            className="pagination-btn"
                            type="button"
                        >
                            {totalPages}
                        </button>
                    </>
                )}

                <button 
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="pagination-btn"
                    type="button"
                >
                    <i className="fa-solid fa-chevron-right"></i>
                </button>
            </div>
        );
    };

    return (
        <div className="products-container">
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
                <div className="filters-section">
                    <h3 className="categories-title">Categories</h3>
                    <select 
                        value={selectedBrand} 
                        onChange={(e) => handleFilterChange('brand', e.target.value, setSelectedBrand)}
                        className="brand-select"
                    >
                        <option value="">All Brands</option>
                        {brands.map((brand) => (
                            <option key={brand} value={brand}>
                                {brand}
                            </option>
                        ))}
                    </select>

                    <select 
                        value={selectedColor} 
                        onChange={(e) => handleFilterChange('color', e.target.value, setSelectedColor)}
                        className="brand-select"
                    >
                        <option value="">All Colors</option>
                        {colors.map((color) => (
                            <option key={color} value={color}>
                                {color}
                            </option>
                        ))}
                    </select>

                    <select 
                        value={selectedMemory} 
                        onChange={(e) => handleFilterChange('memory', e.target.value, setSelectedMemory)}
                        className="brand-select"
                    >
                        <option value="">All Memory Options</option>
                        {memories.map((memory) => (
                            <option key={memory} value={memory}>
                                {memory}
                            </option>
                        ))}
                    </select>

                    <select 
                        value={selectedPriceRange} 
                        onChange={(e) => handleFilterChange('priceRange', e.target.value, setSelectedPriceRange)}
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

                <div className="products-section">
                    <div className="products-grid">
                        {isLoading ? (
                            <Loader />
                        ) : currentPhones.length > 0 ? (
                            currentPhones.map((phone) => (
                                <PhoneTemplate key={phone._id} phone={phone} />
                            ))
                        ) : (
                            <div className="no-products">
                                <i className="fa-solid fa-mobile-screen"></i>
                                <h3>No Products Found</h3>
                                <p>Try adjusting your filters to see more results</p>
                            </div>
                        )}
                    </div>
                    {!isLoading && totalPages > 1 && renderPagination()}
                </div>
            </div>
        </div>
    );
}
