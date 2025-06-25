import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../server/firebase";
import formatDate from "../utils/formatDate";


export const editPhone = async (phoneId, editedProduct) => {
    const productRef = doc(db, "items", phoneId);
    
    const updateData = {
        ...editedProduct,
        updatedAt: formatDate(new Date()),
    };

    // Only include these fields if they exist in editedProduct
    if (editedProduct.model) updateData.model = editedProduct.model;
    if (editedProduct.brand) updateData.brand = editedProduct.brand;
    if (editedProduct.quality) updateData.quality = editedProduct.quality;
    if (editedProduct.description) updateData.description = editedProduct.description;
    if (editedProduct.price) updateData.price = editedProduct.price;
    if (editedProduct.color) updateData.color = editedProduct.color;
    if (editedProduct.memory) updateData.memory = editedProduct.memory;
    if (editedProduct.pending !== undefined) updateData.pending = editedProduct.pending;
    if (editedProduct.images) updateData.images = editedProduct.images;
    
    return await updateDoc(productRef, updateData);
};