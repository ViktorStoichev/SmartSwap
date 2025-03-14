import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../services/firebase";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { useAuth } from "../../../contexts/AuthContext";
import "./Details.css";

export default function Details() {
    const { id } = useParams(); // Взимаме ID-то на продукта от URL
    const { user } = useAuth(); // Взимаме текущия потребител
    const [product, setProduct] = useState(null);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            const productRef = doc(db, "items", id);
            const productSnap = await getDoc(productRef);

            if (productSnap.exists()) {
                setProduct({ id: productSnap.id, ...productSnap.data() });
            }
            setLoading(false);
        };

        fetchProduct();
    }, [id]);

    const handleLike = async () => {
        if (!user) return alert("You need to be logged in to like a product!");

        const productRef = doc(db, "items", id);
        const updatedLikes = product.likes ? product.likes + 1 : 1;

        await updateDoc(productRef, { likes: updatedLikes });
        setProduct((prev) => ({ ...prev, likes: updatedLikes }));
    };

    const handleCommentSubmit = async () => {
        if (!user) return alert("You need to be logged in to comment!");

        if (comment.trim() === "") return;

        const productRef = doc(db, "items", id);
        const newComment = {
            username: user.username,
            text: comment,
            timestamp: new Date().toISOString(),
        };

        await updateDoc(productRef, {
            comments: arrayUnion(newComment),
        });

        setProduct((prev) => ({
            ...prev,
            comments: [...(prev.comments || []), newComment],
        }));

        setComment("");
    };

    if (loading) return <p>Loading product details...</p>;
    if (!product) return <p>Product not found.</p>;

    return (
        <div className="product-details-container">
            {/* Основен контейнер: Снимка + Информация за продукта */}
            <div className="product-main">
                {/* Лява част - Снимка */}
                <div className="product-image-container">
                    <img src={product.imageUrl} alt={product.title} className="product-image" />
                </div>

                {/* Дясна част - Информация */}
                <div className="product-info">
                    <h2 className="product-title">{product.title}</h2>
                    <p className="product-price">{product.price} USD</p>
                    <p className="product-description">{product.description}</p>
                </div>
            </div>

            {/* Втора секция: Харесвания и Коментари */}
            <div className="product-interactions">

                {/* Коментари */}
                <div className="comments-section">
                    {/* Харесвания */}
                    <div className="likes-section">
                        <button onClick={handleLike} className="like-button"><i class="fa-solid fa-heart"></i></button>
                        <span className="likes-count">{product.likes > 0 ? product.likes : 0} Likes</span>
                    </div>
                    <h3>Comments</h3>
                    {user && (
                        <div className="comment-form">
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Write a comment..."
                            />
                            <button onClick={() => handleCommentSubmit(comment)}>Post</button>
                        </div>
                    )}
                    <div className="comments-list">
                        {product.comments?.length > 0 ? (
                            product.comments.map((c, index) => (
                                <div key={index} className="comment">
                                    <strong>{c.username}:</strong> {c.text}
                                </div>
                            ))
                        ) : (
                            <p className="no-comments">No comments yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
