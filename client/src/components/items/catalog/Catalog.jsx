import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../services/firebase";
import { Link } from "react-router-dom";
import Loader from "../../loader/Loader";
import Search from "./Search.jsx";  // Импортиране на компонента за търсене
import './Catalog.css'

export default function Catalog() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

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

    return (
        <div className="products-container">
            <h2 className="products-title">BROWSE FROM ALL OF THE PRODUCTS ON OUR SITE</h2>
            <Search onSearch={handleSearch} onPriceFilter={handlePriceFilter} />  {/* Добавяме Search компонента */}

            <div className="products-grid">
                {filteredProducts.length > 0 ?
                    filteredProducts.map((item) => (
                        <Link key={item.id} className="product-card" to={`/items/${item.id}`}>
                            <div className="image-wrapper">
                                <img src={item.imageUrl} alt={item.title} className="product-image" />
                            </div>
                            <h2 className="product-name">{item.title}</h2>
                            <p className="product-price">${item.price}</p>
                        </Link>
                    )) : <Loader />}
            </div>
        </div>
    );
}
