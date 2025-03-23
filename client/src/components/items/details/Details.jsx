import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import './Details.css'
import Loader from "../../main/loader/Loader";
import { usePhone } from "../../../hook-api/UsePhone";
import { useState } from "react";
import ConfirmModal from "../../main/confirm-modal/ConfirmModal";

export default function Details() {
    const { user } = useAuth();
    const { product, comment, handleLike, handleCommentSubmit, handleDelete } = usePhone();
    const [isModalOpen, setIsModalOpen] = useState();

    if (!product) return <Loader />;

    const isOwner = user && product.ownerId === user.uid;

    return (
        <>
            <ConfirmModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleDelete}
                title={"Confirm Deletion"}
                message={"Are you sure you want to delete this phone?"}
            />
            <div className="product-details-container">
                <div className="product-main">
                    <div className="product-image-container">
                        <img src={product.imageUrl} alt={product.title} className="product-image" />
                    </div>
                    <div className="product-info">
                        <h2>{product.title}</h2>
                        <p>{product.price} USD</p>
                        <p>{product.description}</p>
                    </div>
                </div>

                {isOwner && (
                    <div className="owner-actions">
                        {/* <button onClick={handleEditToggle} className="edit-btn">{isEditing ? "Cancel" : "Edit"}</button> */}
                        <Link to={`/phones/${product._id}/edit`} className="edit-btn">Edit</Link>
                        <button onClick={() => setIsModalOpen(true)} className="delete-btn">Delete</button>
                    </div>
                )}

                <div className="product-interactions">
                    <div className="comments-section">
                        <Link to={`/profile/${product.ownerId}`} className="profile-user">
                            <img src={product.avatarUrl} alt={product.username} className="profile-avatar" />
                            <span>{product.username}</span>
                        </Link>
                        {user && (
                            <>
                                <button onClick={handleLike} className={`like-button ${product.likes.includes(user?.uid) ? "liked" : ""}`}>
                                    {product.likes.includes(user?.uid) ? <i className="fa-solid fa-heart-crack"></i> : <i className="fa-solid fa-heart"></i>}
                                </button>
                                <span>{product.likes.length} Likes</span>
                                <div className="contact">
                                    <h3>Contact the seller:</h3>
                                    <button className="chat"><i className="fa-solid fa-message"></i></button>
                                    <button className="chat"><i className="fa-solid fa-phone"></i></button>
                                </div>
                                <h3>Ask a question about this product:</h3>
                                <div className="comment-form">
                                    <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Write a comment..." />
                                    <button onClick={handleCommentSubmit}>Post</button>
                                </div>
                            </>
                        )}
                        <div className="comments-list">
                            {product.comments?.length > 0 ? (
                                product.comments.map((c, index) => (
                                    <div key={index} className="comment">
                                        <div className="comment-header">
                                            <Link to={`/profile/${c.userId}`} className="comment-user">
                                                <img src={c.avatarUrl} alt={c.username} className="comment-avatar" />
                                                <span>{c.username}</span>
                                            </Link>
                                            <span className="comment-date">{new Date(c.date).toLocaleDateString()}</span>
                                        </div>
                                        <p>{c.text}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No comments yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
