import { useEffect, useState } from "react";
import { getAllPhones } from "../services/getAllPhones";

export const usePhones = (user = {}) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [likedPhones, setLikedPhones] = useState([]);

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

    const handleSearch = (searchTerm) => {
        const filtered = products.filter((product) =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    const handlePriceFilter = (maxPrice) => {
        const filtered = products.filter((product) => {
            return Number(product.price) <= maxPrice;
        });
        if (maxPrice === "" || maxPrice === null) {
            setFilteredProducts(products);
            return;
        }
        setFilteredProducts(filtered);
    };

    return { filteredProducts, likedPhones, handleSearch, handlePriceFilter };
}