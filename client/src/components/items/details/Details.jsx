import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import './Details.css'
import Loader from "../../main/loader/Loader";
import { usePhone } from "../../../hook-api/details-hooks/UsePhone";
import { useImageCarousel } from "../../../hook-api/details-hooks/UseImageCarousel";
import { useDetailsActions } from "../../../hook-api/details-hooks/UseDetailsActions";
import { useDetailsPermissions } from "../../../hook-api/details-hooks/UseDetailsPermissions";
import ConfirmModal from "../../main/confirm-modal/ConfirmModal";

export default function Details() {
    const { user } = useAuth();
    const { product, comment, setComment, handleLike, handleCommentSubmit, handleDelete, isDeleting } = usePhone();

    // Get image carousel functionality (hooks must be called before any conditional returns)
    const { images, currentImage, maxImages, handlePrev, handleNext } = useImageCarousel(product?.images);
    
    // Get admin actions and modal functionality
    const { isModalOpen, isApproving, isRejecting, handleApprove, handleReject, openModal, closeModal } = useDetailsActions(product?._id, images);
    
    // Get user permissions and access control
    const { isOwner, isAdmin, canView, checkViewPermission } = useDetailsPermissions(user, product);

    // Check if any loading state is active
    const isLoading = isDeleting || isApproving || isRejecting;

    // Show loading spinner while fetching product data
    if (!product) return <Loader />;

    // If not owner or admin and phone is pending, redirect to catalog
    if (!checkViewPermission()) {
        return null;
    }

    // Show loader if any action is in progress
    if (isLoading) {
        return (
            <div className="details-product-container">
                <div className="loading-container">
                    <Loader />
                    <p className="loading-text">
                        {isDeleting ? "Deleting phone listing..." : 
                         isApproving ? "Approving phone listing..." :
                         isRejecting ? "Rejecting phone listing..." : "Processing..."}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <>
            <ConfirmModal
                isOpen={isModalOpen}
                onClose={closeModal}
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
                        <div className="carousel-wrapper">
                            <button onClick={handlePrev} disabled={maxImages <= 1} className="carousel-arrow left">&#8592;</button>
                            <img src={images[currentImage].url} alt={`${product.brand} ${product.model}`} className="details-product-image details-product-image-zoom" />
                            <button onClick={handleNext} disabled={maxImages <= 1} className="carousel-arrow right">&#8594;</button>
                        </div>
                        <div className="carousel-indicator">
                            {currentImage + 1} / {maxImages}
                        </div>
                    </div>
                    <div className="details-product-info">
                        <div className="details-product-header">
                            <h2 className="details-product-title">{product.brand} {product.model}</h2>
                            <div className="details-product-price">${Number(product.price).toFixed(2)}</div>
                        </div>

                        <div className="details-product-specs">
                            <div className="details-product-spec-item">
                                <i className="fa-solid fa-palette"></i>
                                <span>Color: {product.color}</span>
                            </div>
                            <div className="details-product-spec-item">
                                <i className="fa-solid fa-memory"></i>
                                <span>Memory: {product.memory}</span>
                            </div>
                            <div className="details-product-spec-item">
                                <i className="fa-solid fa-star"></i>
                                <span>Quality: {product.quality}</span>
                            </div>
                        </div>

                        <div className="details-product-description">
                            <h3>Description</h3>
                            <p>{product.description}</p>
                        </div>

                        <div className="details-product-meta">
                            <div className="details-product-meta-item">
                                <i className="fa-solid fa-calendar"></i>
                                <span>Listed: {product.createdAt}</span>
                            </div>
                            <div className="details-product-meta-item">
                                <i className="fa-solid fa-eye"></i>
                                <span>Views: {product.views || 0}</span>
                            </div>
                        </div>

                        {isOwner && (
                            <div className="details-product-owner-actions">
                                <Link to={`/phones/${product._id}/edit`} className="details-product-edit-btn">
                                    <i className="fa-solid fa-pen-to-square"></i>
                                    Edit
                                </Link>
                                <button onClick={openModal} className="details-product-delete-btn">
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

                        <div className="details-product-comments-list">
                            <h3>Questions ({product.comments.length})</h3>
                            {product.comments.length === 0 ? (
                                <div className="details-product-no-comments">
                                    <i className="fa-solid fa-comments"></i>
                                    <p>No questions yet</p>
                                    <p>Be the first to ask a question about this product!</p>
                                </div>
                            ) : (
                                product.comments.map((comment, index) => (
                                    <div key={index} className="details-product-comment">
                                        <div className="details-product-comment-header">
                                            <img src={comment.avatarUrl} alt={comment.username} className="details-product-comment-avatar" />
                                            <div className="details-product-comment-info">
                                                <span className="details-product-comment-username">{comment.username}</span>
                                                <span className="details-product-comment-date">{comment.date}</span>
                                            </div>
                                        </div>
                                        <p className="details-product-comment-text">{comment.text}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
