import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../server/firebase";
import formatDate from "../utils/formatDate";


export const editPhone = async (phoneId, editedProduct) => {
    const productRef = doc(db, "items", phoneId);
    
    return await updateDoc(productRef, {
        model: editedProduct.model,
        brand: editedProduct.brand,
        quality: editedProduct.quality,
        description: editedProduct.description,
        price: editedProduct.price,
        imageUrl: editedProduct.imageUrl,
        color: editedProduct.color,
        memory: editedProduct.memory,
        updatedAt: formatDate(new Date()),
    });
};