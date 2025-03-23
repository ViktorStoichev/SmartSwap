import { Link } from 'react-router-dom';
import './Home.css'
import Loader from '../loader/Loader';
import { usePhones } from '../../../hook-api/UsePhones';

export default function Home() {

    const { filteredProducts } = usePhones();

    const lastThreeProducts = [...filteredProducts].sort((a, b) => b.createdAt - a.createdAt).slice(0, 3);

    return (
        <section className="welcome-section">
            <h1>Welcome to <span className="brand-name">SmartSwap</span> – Your Destination for Quality Pre-Owned Phones! 📱✨</h1>
            <p>Looking for a reliable second-hand smartphone at an unbeatable price? You've come to the right place!</p>
            <p>At <strong>Thrift Shop</strong>, we offer a carefully curated selection of <strong>affordable, high-quality</strong> pre-owned phones to suit every budget.</p>

            <ul className="features-list">
                <li>✔️ <strong>Tested for Performance</strong></li>
                <li>✔️ <strong>Great Deals on Top Brands</strong></li>
                <li>✔️ <strong>Eco-Friendly & Budget-Friendly</strong></li>
            </ul>

            <div className="products-grid">
                {lastThreeProducts.length > 0 ?
                    lastThreeProducts.map((item) => (
                        <Link key={item.id} className="product-card" to={`/phones/${item.id}`}>
                            <div className="image-wrapper">
                                <img src={item.imageUrl} alt={item.title} className="product-image" />
                            </div>
                            <h2 className="product-name">{item.title}</h2>
                            <p className="product-price">${item.price}</p>
                        </Link>
                    )) : <Loader />}
            </div>

            <Link to="/phones" className="browse-btn">Start Browsing 🚀</Link>
        </section>
    );
}