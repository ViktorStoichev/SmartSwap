import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../services/firebase";
import "./LikedPhones.css";
import { Link } from "react-router-dom";
import Loader from "../../loader/Loader";
import { useAuth } from "../../../contexts/AuthContext";

export default function LikedPhones() {
    const [products, setProducts] = useState([]);
    const { user } = useAuth();

    
    useEffect(() => {
        const fetchProducts = async () => {
            if (!user) return <Loader />;
            try {
                const querySnapshot = await getDocs(collection(db, "items"));
                const itemsList = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                const filter = itemsList.filter((item) => item.likes.includes(user.uid))
                setProducts(filter);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, [user]);

    if (products.length < 1) return <Loader />;

    return (
        <div className="products-container">
            <h2 className="products-title">LIKED PHONES</h2>
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
