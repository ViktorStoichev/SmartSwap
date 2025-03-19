import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../server/firebase";


export const usePhones = (user = {}) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [likedPhones, setLikedPhones] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "items"));
                const itemsList = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setProducts(itemsList);
                setFilteredProducts(itemsList);  // Задаваме начален набор от продукти
                const filter = itemsList.filter((item) => item.likes.includes(user.uid));
                setLikedPhones(filter);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    // Функция за търсене на продукти по име
    const handleSearch = (searchTerm) => {
        const filtered = products.filter((product) =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    // Функция за филтриране на продукти по цена
    const handlePriceFilter = (maxPrice) => {
        const filtered = products.filter((product) => {
            return Number(product.price) <= maxPrice;
        });
        if (maxPrice === "" || maxPrice === null) {
            setFilteredProducts(products); // Ако полето е празно, показваме всички продукти
            return;
        }
        setFilteredProducts(filtered);
    };

    return { filteredProducts, likedPhones, handleSearch, handlePriceFilter };
}