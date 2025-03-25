import { Link } from 'react-router-dom';
import './Home.css'
import Loader from '../loader/Loader';
import { usePhones } from '../../../hook-api/UsePhones';
import PhoneTemplate from '../../items/phone-template/PhoneTemplate';

export default function Home() {

    const { filteredProducts } = usePhones();

    const getRandomProducts = (array, num) => {
        const shuffled = [...array].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
    };

    const lastThreeProducts = getRandomProducts(filteredProducts, 3);

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

            <h2>Some of the selling phones:</h2>

            <div className="products-grid">
                {lastThreeProducts.length > 0 ?
                    lastThreeProducts.map((item) => <PhoneTemplate phone={item} key={item._id} />) : <Loader />}
            </div>

            <Link to="/phones" className="browse-btn">Start Browsing 🚀</Link>
        </section>
    );
}