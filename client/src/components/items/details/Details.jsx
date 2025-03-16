import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { db } from "../../../services/firebase";
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove, deleteDoc } from "firebase/firestore";
import { useAuth } from "../../../contexts/AuthContext";
import './Details.css'
import formatDate from "../../../utils/formatDate";
import Loader from "../../loader/Loader";

export default function Details() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [comment, setComment] = useState("");
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            const docRef = doc(db, "items", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setProduct({ id: docSnap.id, ...docSnap.data() });
                console.log(product);
            }
        };
        fetchProduct();

    }, [id]);

    const handleLike = async () => {
        if (!user) return;
        const productRef = doc(db, "items", id);
        const isLiked = product.likes.includes(user.uid);

        await updateDoc(productRef, {
            likes: isLiked ? arrayRemove(user.uid) : arrayUnion(user.uid),
        });
        setProduct((prev) => ({
            ...prev,
            likes: isLiked ? prev.likes.filter((uid) => uid !== user.uid) : [...prev.likes, user.uid],
        }));
    };

    const handleCommentSubmit = async () => {
        if (!user || !comment.trim()) return;
        const newComment = {
            userId: user.uid,
            username: user.username,
            avatarUrl: user.avatarUrl,
            text: comment,
            date: formatDate(new Date()),
        };

        const productRef = doc(db, "items", id);
        await updateDoc(productRef, {
            comments: arrayUnion(newComment),
        });

        setProduct((prev) => ({
            ...prev,
            comments: [...prev.comments, newComment],
        }));
        setComment("");
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this item?");
        if (confirmDelete) {
            await deleteDoc(doc(db, "items", id));
            navigate("/items");
        }
    };

    if (!product) return <Loader />;

    const isOwner = user && product.owner === user.uid;

    return (
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
                    <Link to={`/items/${product.id}/edit`} className="edit-btn">Edit</Link>
                    <button onClick={handleDelete} className="delete-btn">Delete</button>
                </div>
            )}

            <div className="product-interactions">

                <div className="comments-section">
                    <button onClick={handleLike} className={`like-button ${product.likes.includes(user?.uid) ? "liked" : ""}`}>
                        {product.likes.includes(user?.uid) ? <i className="fa-solid fa-heart-crack"></i> : <i className="fa-solid fa-heart"></i>}
                    </button>
                    <span>{product.likes.length} Likes</span>
                    <h3>Comments</h3>
                    {user && (
                        <div className="comment-form">
                            <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Write a comment..." />
                            <button onClick={handleCommentSubmit}>Post</button>
                        </div>
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
    );
};
