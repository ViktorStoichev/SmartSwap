import { Link } from 'react-router-dom';
import './Home.css'
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../../server/firebase';
import Loader from '../../loader/Loader';

export default function Home() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "items"));
                const itemsList = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                const lastThreeProducts = [...itemsList].sort((a, b) => b.createdAt - a.createdAt).slice(0, 3);
                setProducts(lastThreeProducts);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <section className="welcome-section">
            <h1>Welcome to <span className="brand-name">Thrift Shop</span> – Your Destination for Quality Pre-Owned Phones! 📱✨</h1>
            <p>Looking for a reliable second-hand smartphone at an unbeatable price? You've come to the right place!</p>
            <p>At <strong>Thrift Shop</strong>, we offer a carefully curated selection of <strong>affordable, high-quality</strong> pre-owned phones to suit every budget.</p>

            <ul className="features-list">
                <li>✔️ <strong>Tested for Performance</strong></li>
                <li>✔️ <strong>Great Deals on Top Brands</strong></li>
                <li>✔️ <strong>Eco-Friendly & Budget-Friendly</strong></li>
            </ul>

            <div className="products-grid">
                {products.length > 0 ?
                    products.map((item) => (
                        <Link key={item.id} className="product-card" to={`/items/${item.id}`}>
                            <div className="image-wrapper">
                                <img src={item.imageUrl} alt={item.title} className="product-image" />
                            </div>
                            <h2 className="product-name">{item.title}</h2>
                            <p className="product-price">${item.price}</p>
                        </Link>
                    )) : <Loader />}
            </div>

            <Link to="/items" className="browse-btn">Start Browsing 🚀</Link>
        </section>
    );
}