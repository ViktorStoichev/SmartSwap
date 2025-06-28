// Phones Catalog Hook
// Manages phone catalog data, filtering, search, and user interactions
// Handles data fetching, filtering logic, search functionality, and liked phones tracking

import { useEffect, useState } from "react";
import { getAllPhones } from "../../services/get-phones-services/getAllPhones";
import { useSearchParams } from "react-router-dom";

export const usePhones = (user = {}) => {
    // Get search parameters from URL for search functionality
    const [searchParams] = useSearchParams();
    
    // State for storing all approved phones
    const [products, setProducts] = useState([]);
    
    // State for filtered/search results
    const [filteredProducts, setFilteredProducts] = useState([]);
    
    // State for tracking user's liked phones
    const [likedPhones, setLikedPhones] = useState([]);
    
    // State for filter options extracted from phone data
    const [brands, setBrands] = useState([]);
    const [colors, setColors] = useState([]);
    const [memories, setMemories] = useState([]);
    
    // Loading state for data fetching
    const [isLoading, setIsLoading] = useState(true);
    
    // State for tracking active filter selections
    const [activeFilters, setActiveFilters] = useState({
        brand: "",
        color: "",
        memory: "",
        quality: "",
        priceRange: ""
    });

    // Fetch and process phone data on component mount
    useEffect(() => {
        // Flag to prevent state updates if component unmounts during async operation
        let isMounted = true;

        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                
                // Fetch all phones from backend
                const phones = await getAllPhones();
                
                // Filter out pending phones (only show approved listings)
                const approvedPhones = phones.filter(phone => !phone.pending);

                if (isMounted) {
                    // Set main products and filtered products
                    setProducts(approvedPhones);
                    setFilteredProducts(approvedPhones);
                    
                    // Filter phones liked by current user
                    const filter = approvedPhones.filter((item) => item.likes.includes(user.uid));
                    setLikedPhones(filter);
                    
                    // Extract unique brands from phones for filter options
                    const uniqueBrands = [...new Set(approvedPhones.map(phone => phone.brand))].filter(Boolean);
                    setBrands(uniqueBrands);

                    // Extract unique colors for filter options
                    const uniqueColors = [...new Set(approvedPhones.map(phone => phone.color))].filter(Boolean);
                    setColors(uniqueColors);

                    // Extract unique memory options for filter options
                    const uniqueMemories = [...new Set(approvedPhones.map(phone => phone.memory))].filter(Boolean);
                    setMemories(uniqueMemories);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchProducts();

        // Cleanup function to prevent memory leaks
        return () => {
            isMounted = false;
        }
    }, []);

    // Handle search and filtering based on URL parameters and product changes
    useEffect(() => {
        const searchQuery = searchParams.get('search');
        if (searchQuery) {
            // Perform search across brand, model, and combined brand+model
            const searchResults = products.filter(product => {
                const searchLower = searchQuery.toLowerCase();
                return (
                    product.brand.toLowerCase().includes(searchLower) ||
                    product.model.toLowerCase().includes(searchLower) ||
                    `${product.brand} ${product.model}`.toLowerCase().includes(searchLower)
                );
            });
            setFilteredProducts(searchResults);
        } else {
            // Apply active filters when no search query is present
            applyFilters(activeFilters);
        }
    }, [searchParams, products]);

    // Apply multiple filters to the products
    const applyFilters = (filters) => {
        let filtered = [...products];

        // Filter by brand
        if (filters.brand) {
            filtered = filtered.filter(product => product.brand === filters.brand);
        }
        
        // Filter by color
        if (filters.color) {
            filtered = filtered.filter(product => product.color === filters.color);
        }
        
        // Filter by memory capacity
        if (filters.memory) {
            filtered = filtered.filter(product => product.memory === filters.memory);
        }
        
        // Filter by quality condition
        if (filters.quality) {
            filtered = filtered.filter(product => product.quality === filters.quality);
        }
        
        // Filter by price range (min-max format)
        if (filters.priceRange) {
            const [min, max] = filters.priceRange.split('-').map(Number);
            filtered = filtered.filter(product => {
                const price = Number(product.price);
                return price >= min && price <= max;
            });
        }

        setFilteredProducts(filtered);
    };

    // Handle individual filter changes
    const handleFilter = (type, value) => {
        // Update active filters with new selection
        const newFilters = {
            ...activeFilters,
            [type]: value
        };
        setActiveFilters(newFilters);

        // Apply all active filters to update results
        applyFilters(newFilters);
    };

    // Return filtered data, filter options, and handler functions
    return { 
        filteredProducts, 
        likedPhones, 
        brands,
        colors,
        memories,
        handleFilter,
        isLoading
    };
}