import { useEffect, useState } from "react";
import { getAllPhones } from "../services/getAllPhones";
import { useSearchParams } from "react-router-dom";

export const usePhones = (user = {}) => {
    const [searchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [likedPhones, setLikedPhones] = useState([]);
    const [brands, setBrands] = useState([]);
    const [colors, setColors] = useState([]);
    const [memories, setMemories] = useState([]);
    const [activeFilters, setActiveFilters] = useState({
        brand: "",
        color: "",
        memory: "",
        quality: "",
        priceRange: ""
    });

    useEffect(() => {
        let isMounted = true;

        const fetchProducts = async () => {
            try {
                const phones = await getAllPhones();

                if (isMounted) {
                    setProducts(phones);
                    setFilteredProducts(phones);
                    const filter = phones.filter((item) => item.likes.includes(user.uid));
                    setLikedPhones(filter);
                    
                    // Extract unique brands from phones
                    const uniqueBrands = [...new Set(phones.map(phone => phone.brand))].filter(Boolean);
                    setBrands(uniqueBrands);

                    // Extract unique colors
                    const uniqueColors = [...new Set(phones.map(phone => phone.color))].filter(Boolean);
                    setColors(uniqueColors);

                    // Extract unique memory options
                    const uniqueMemories = [...new Set(phones.map(phone => phone.memory))].filter(Boolean);
                    setMemories(uniqueMemories);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();

        return () => {
            isMounted = false;
        }
    }, []);

    useEffect(() => {
        const searchQuery = searchParams.get('search');
        if (searchQuery) {
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
            applyFilters(activeFilters);
        }
    }, [searchParams, products]);

    const applyFilters = (filters) => {
        let filtered = [...products];

        if (filters.brand) {
            filtered = filtered.filter(product => product.brand === filters.brand);
        }
        if (filters.color) {
            filtered = filtered.filter(product => product.color === filters.color);
        }
        if (filters.memory) {
            filtered = filtered.filter(product => product.memory === filters.memory);
        }
        if (filters.quality) {
            filtered = filtered.filter(product => product.quality === filters.quality);
        }
        if (filters.priceRange) {
            const [min, max] = filters.priceRange.split('-').map(Number);
            filtered = filtered.filter(product => {
                const price = Number(product.price);
                return price >= min && price <= max;
            });
        }

        setFilteredProducts(filtered);
    };

    const handleFilter = (type, value) => {
        // Update active filters
        const newFilters = {
            ...activeFilters,
            [type]: value
        };
        setActiveFilters(newFilters);

        // Apply all active filters
        applyFilters(newFilters);
    };

    return { 
        filteredProducts, 
        likedPhones, 
        brands,
        colors,
        memories,
        handleFilter
    };
}