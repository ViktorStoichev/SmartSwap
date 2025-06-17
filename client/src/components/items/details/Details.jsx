import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import './Details.css'
import Loader from "../../main/loader/Loader";
import { usePhone } from "../../../hook-api/UsePhone";
import { useState } from "react";
import ConfirmModal from "../../main/confirm-modal/ConfirmModal";
import { approvePhone, rejectPhone } from "../../../services/phoneService";

export default function Details() {
    const { user } = useAuth();
    const { product, comment, setComment, handleLike, handleCommentSubmit, handleDelete } = usePhone();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    if (!product) return <Loader />;

    const isOwner = user && product.ownerId === user.uid;
    const isAdmin = user && user.admin;
    const canView = isOwner || isAdmin || !product.pending;

    // If not owner or admin and phone is pending, redirect to catalog
    if (!canView) {
        navigate('/phones');
        return null;
    }

    const handleApprove = async () => {
        try {
            await approvePhone(product._id);
            navigate('/phones');
        } catch (error) {
            console.error('Error approving phone:', error);
        }
    };

    const handleReject = async () => {
        try {
            await rejectPhone(product._id);
            navigate('/phones');
        } catch (error) {
            console.error('Error rejecting phone:', error);
        }
    };

    return (
        <>
            <ConfirmModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleDelete}
                title={"Confirm Deletion"}
                message={"Are you sure you want to delete this phone?"}
            />
            <div className="details-product-container">
                {product.pending && (
                    <div className="pending-banner">
                        <i className="fa-solid fa-clock"></i>
                        <span>This listing is pending approval</span>
                    </div>
                )}
                <div className="details-product-main">
                    <div className="details-product-image-container">
                        <img src={product.imageUrl} alt={`${product.brand} ${product.model}`} className="details-product-image" />
                    </div>
                    <div className="details-product-info">
                        <div className="details-product-header">
                            <h2 className="details-product-title">{product.brand} {product.model}</h2>
                            <div className="details-product-price">${Number(product.price).toFixed(2)}</div>
                        </div>
                        
                        <div className="details-product-specs">
                            <div className="details-product-spec-item">
                                <i className="fa-solid fa-palette"></i>
                                <span>{product.color}</span>
                            </div>
                            <div className="details-product-spec-item">
                                <i className="fa-solid fa-memory"></i>
                                <span>{product.memory}</span>
                            </div>
                            <div className="details-product-spec-item">
                                <i className="fa-solid fa-star"></i>
                                <span>{product.quality}</span>
                            </div>
                        </div>

                        <div className="details-product-description">
                            <h3>Description</h3>
                            <p>{product.description}</p>
                        </div>

                        <div className="details-product-meta">
                            <div className="details-product-meta-item">
                                <i className="fa-solid fa-calendar"></i>
                                <span>Posted: {new Date(product.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="details-product-meta-item">
                                <i className="fa-solid fa-clock"></i>
                                <span>Updated: {new Date(product.updatedAt).toLocaleDateString()}</span>
                            </div>
                        </div>

                        {isOwner && (
                            <div className="details-product-owner-actions">
                                <Link to={`/phones/${product._id}/edit`} className="details-product-edit-btn">
                                    <i className="fa-solid fa-pen-to-square"></i>
                                    Edit
                                </Link>
                                <button onClick={() => setIsModalOpen(true)} className="details-product-delete-btn">
                                    <i className="fa-solid fa-trash"></i>
                                    Delete
                                </button>
                            </div>
                        )}

                        {isAdmin && product.pending && (
                            <div className="details-product-admin-actions">
                                <button onClick={handleApprove} className="details-product-approve-btn">
                                    <i className="fa-solid fa-check"></i>
                                    Approve
                                </button>
                                <button onClick={handleReject} className="details-product-reject-btn">
                                    <i className="fa-solid fa-xmark"></i>
                                    Reject
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="details-product-interactions">
                    <div className="details-product-comments-section">
                        <div className="details-product-seller-info">
                            <Link to={`/profile/${product.ownerId}`} className="details-product-profile-user">
                                <img src={product.avatarUrl} alt={product.username} className="details-product-profile-avatar" />
                                <div className="details-product-seller-details">
                                    <span className="details-product-seller-name">{product.username}</span>
                                    <span className="details-product-seller-label">Seller</span>
                                </div>
                            </Link>
                        </div>

                        {user && !product.pending && (
                            <div className="details-product-interaction-buttons">
                                <button onClick={handleLike} className={`details-product-like-button ${product.likes.includes(user?.uid) ? "liked" : ""}`}>
                                    {product.likes.includes(user?.uid) ? <i className="fa-solid fa-heart-crack"></i> : <i className="fa-solid fa-heart"></i>}
                                    <span>{product.likes.length} Likes</span>
                                </button>

                                {!isOwner && (
                                    <div className="details-product-contact-buttons">
                                        <Link to={`/chat/${product.ownerId}`} className="details-product-contact-btn">
                                            <i className="fa-solid fa-message"></i>
                                            Message
                                        </Link>
                                        <button className="details-product-contact-btn">
                                            <i className="fa-solid fa-phone"></i>
                                            Call
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {user && !product.pending && (
                            <div className="details-product-comment-form">
                                <h3>Ask a question about this product</h3>
                                <textarea 
                                    value={comment} 
                                    onChange={(e) => setComment(e.target.value)} 
                                    placeholder="Write your question here..." 
                                />
                                <button onClick={handleCommentSubmit}>
                                    <i className="fa-solid fa-paper-plane"></i>
                                    Post Question
                                </button>
                            </div>
                        )}

                        {!product.pending && (
                            <div className="details-product-comments-list">
                                <h3>Questions & Answers</h3>
                                {product.comments?.length > 0 ? (
                                    product.comments.map((c, index) => (
                                        <div key={index} className="details-product-comment">
                                            <div className="details-product-comment-header">
                                                <Link to={`/profile/${c.userId}`} className="details-product-comment-user">
                                                    <img src={c.avatarUrl} alt={c.username} className="details-product-comment-avatar" />
                                                    <div className="details-product-comment-user-info">
                                                        <span className="details-product-comment-username">{c.username}</span>
                                                        <span className="details-product-comment-date">{new Date(c.date).toLocaleDateString()}</span>
                                                    </div>
                                                </Link>
                                            </div>
                                            <p className="details-product-comment-text">{c.text}</p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="details-product-no-comments">
                                        <i className="fa-solid fa-comments"></i>
                                        <p>No questions yet. Be the first to ask!</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
