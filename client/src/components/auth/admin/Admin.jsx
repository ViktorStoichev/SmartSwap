// Admin component for reviewing pending phone listings

import React, { useMemo } from 'react';
import UseAdminPhones from '../../../hook-api/auth-hooks/UseAdminPhones';
import Loader from '../../main/loader/Loader';
import PhoneTemplate from '../../items/phone-template/PhoneTemplate';
import './Admin.css';

const Admin = () => {
    // Get pending phones and loading state from custom hook
    const { pendingPhones, loading } = UseAdminPhones();

    // Memoize the rendered phone list to avoid unnecessary re-renders
    const renderedPhones = useMemo(() => (
        pendingPhones.map(phone => (
            <PhoneTemplate key={phone._id} phone={phone} />
        ))
    ), [pendingPhones]);

    // Show loading spinner while fetching data
    if (loading) return <Loader />;

    return (
        <div className="admin-container">
            {/* Admin page header with dynamic subtitle */}
            <div className="admin-header">
                <h2 className="admin-title">Pending Phone Listings</h2>
                {/* Display dynamic subtitle based on pending phones count */}
                <p className="admin-subtitle">
                    {pendingPhones.length > 0 
                        ? `You have ${pendingPhones.length} phone${pendingPhones.length === 1 ? '' : 's'} waiting for review`
                        : "All phone listings have been reviewed"}
                </p>
            </div>

            {/* Render phone grid if there are pending phones, otherwise show empty state */}
            {pendingPhones.length > 0 ? (
                <div className="admin-phones-grid">
                    {/* Map through pending phones and render each as a phone template */}
                    {renderedPhones}
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

export default React.memo(Admin);