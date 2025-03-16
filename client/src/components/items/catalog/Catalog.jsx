import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../services/firebase";
import "./Catalog.css";
import { Link } from "react-router-dom";
import Loader from "../../loader/Loader";

export default function Catalog() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "items"));
                const itemsList = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setProducts(itemsList);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    if (products.length < 1) return <Loader />;

    return (
        <div className="products-container">
            <h2 className="products-title">BROWSE FROM ALL OF THE PRODUCTS ON OUR SITE</h2>
            <div className="products-grid">
                {
                    products.map((item) => (
                        <Link key={item.id} className="product-card" to={`/items/${item.id}`}>
                            <div className="image-wrapper">
                                <img src={item.imageUrl} alt={item.title} className="product-image" />
                            </div>
                            <h2 className="product-name">{item.title}</h2>
                            <p className="product-price">${item.price}</p>
                        </Link>
                    ))}
            </div>
        </div>
    );
};
