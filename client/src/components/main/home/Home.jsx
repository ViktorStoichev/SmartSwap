// Home Page Component
// Landing page that showcases SmartSwap platform and displays latest phone listings

import { Link } from 'react-router-dom';
import './Home.css'
import Loader from '../loader/Loader';
import { usePhones } from '../../../hook-api/phones-hooks/UsePhones';
import PhoneTemplate from '../../items/phone-template/PhoneTemplate';

export default function Home() {
    // Get phones data and loading state from custom hook
    const { filteredProducts, isLoading } = usePhones();

    // Utility function to get random products for display
    const getRandomProducts = (array, num) => {
        const shuffled = [...array].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
    };

    // Get 3 random products to display on homepage
    const lastThreeProducts = getRandomProducts(filteredProducts, 3);

    return (
        <section className="welcome-section">
            {/* Main welcome heading with brand name */}
            <h1>Welcome to <span className="brand-name">SmartSwap</span> – Your Trusted Peer-to-Peer Phone Marketplace! 📱</h1>
            
            {/* Platform description */}
            <p>Connect directly with other users to buy and sell pre-owned smartphones. SmartSwap provides a secure platform where you can list your phone, chat with potential buyers, and arrange safe transactions.</p>
            
            {/* Value proposition */}
            <p>Whether you're looking to upgrade your current device or find a great deal on a second-hand phone, our community-driven marketplace makes it easy to connect with local buyers and sellers.</p>

            {/* Platform features list */}
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

            {/* Latest listings section */}
            <h2>Latest Listings</h2>

            {/* Products grid with conditional rendering */}
            <div className="home-products-grid">
                {isLoading ? (
                    // Show loader while data is being fetched
                    <Loader />
                ) : lastThreeProducts.length > 0 ? (
                    // Display random phone listings using PhoneTemplate component
                    lastThreeProducts.map((item) => <PhoneTemplate phone={item} key={item._id} />)
                ) : (
                    // Show message when no products are available
                    <p>No products available</p>
                )}
            </div>

            {/* Call-to-action button to browse all phones */}
            <div style={{ textAlign: 'center' }}>
                <Link to="/phones" className="browse-btn">Start Trading Now 🚀</Link>
            </div>
        </section>
    );
}