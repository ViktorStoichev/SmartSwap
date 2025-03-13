import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../services/firebase";
import "./Catalog.css";

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

  return (
    <div className="products-container">
      <h2 className="products-title">BROWSE FROM ALL OF THE PRODUCTS ON OUR SITE</h2>
      <div className="products-grid">
        {products.length > 0 ? (
          products.map((item) => (
            <div key={item.id} className="product-card">
              <img src={item.imageUrl} alt={item.title} className="product-image" />
              <h3 className="product-name">{item.title}</h3>
              <p className="product-description">{item.description}</p>
              <p className="product-price">${item.price}</p>
              <button className="add-to-cart-button">Details</button>
            </div>
          ))
        ) : (
          <p className="no-products">No products available.</p>
        )}
      </div>
    </div>
  );
};
