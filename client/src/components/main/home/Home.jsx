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
            <h1>Welcome to <span className="brand-name">SmartSwap</span> – Your Trusted Peer-to-Peer Phone Marketplace! 📱</h1>
            
            <p>Connect directly with other users to buy and sell pre-owned smartphones. SmartSwap provides a secure platform where you can list your phone, chat with potential buyers, and arrange safe transactions.</p>
            
            <p>Whether you're looking to upgrade your current device or find a great deal on a second-hand phone, our community-driven marketplace makes it easy to connect with local buyers and sellers.</p>

            <div className="features-list">
                <li>
                    <strong>Direct Communication</strong>
                    Chat directly with buyers and sellers through our messaging system
                </li>
                <li>
                    <strong>Community Driven</strong>
                    Connect with local users in your area for easy meetups
                </li>
                <li>
                    <strong>Safe Trading</strong>
                    Tips and guidelines for secure peer-to-peer transactions
                </li>
            </div>

            <h2>Latest Listings</h2>

            <div className="products-grid">
                {lastThreeProducts.length > 0 ?
                    lastThreeProducts.map((item) => <PhoneTemplate phone={item} key={item._id} />) : <Loader />}
            </div>

            <div style={{ textAlign: 'center' }}>
                <Link to="/phones" className="browse-btn">Start Trading Now 🚀</Link>
            </div>
        </section>
    );
}