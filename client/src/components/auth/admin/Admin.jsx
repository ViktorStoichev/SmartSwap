import { useEffect, useState } from 'react';
import { getPendingPhones } from '../../../services/phoneService';
import Loader from '../../main/loader/Loader';
import PhoneTemplate from '../../items/phone-template/PhoneTemplate';
import './Admin.css';

const Admin = () => {
    const [pendingPhones, setPendingPhones] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPendingPhones();
    }, []);

    const fetchPendingPhones = async () => {
        try {
            const phones = await getPendingPhones();
            setPendingPhones(phones);
        } catch (error) {
            console.error('Error fetching pending phones:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="admin-container">
            <div className="admin-header">
                <h2 className="admin-title">Pending Phone Listings</h2>
                <p className="admin-subtitle">
                    {pendingPhones.length > 0 
                        ? `You have ${pendingPhones.length} phone${pendingPhones.length === 1 ? '' : 's'} waiting for review`
                        : "All phone listings have been reviewed"}
                </p>
            </div>

            {pendingPhones.length > 0 ? (
                <div className="admin-phones-grid">
                    {pendingPhones.map(phone => (
                        <PhoneTemplate key={phone._id} phone={phone} />
                    ))}
                </div>
            ) : (
                <div className="no-pending">
                    <i className="fa-solid fa-check-circle"></i>
                    <h3>No Pending Listings</h3>
                    <p>All phone listings have been reviewed.</p>
                </div>
            )}
        </div>
    );
};

export default Admin; 