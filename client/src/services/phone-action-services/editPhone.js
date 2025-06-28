// Edit Phone Service
// Updates an existing phone listing in Firebase Firestore
// Handles conditional field updates and automatic timestamp management

import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../server/firebase";
import formatDate from "../../utils/formatDate";

export const editPhone = async (phoneId, editedProduct) => {
    // Get reference to the specific phone document in Firestore
    const productRef = doc(db, "items", phoneId);
    
    // Prepare update data with automatic timestamp update
    const updateData = {
        ...editedProduct,
        updatedAt: formatDate(new Date()),
    };

    // Conditionally include fields only if they exist in editedProduct
    // This prevents overwriting fields with undefined values
    if (editedProduct.model) updateData.model = editedProduct.model;
    if (editedProduct.brand) updateData.brand = editedProduct.brand;
    if (editedProduct.quality) updateData.quality = editedProduct.quality;
    if (editedProduct.description) updateData.description = editedProduct.description;
    if (editedProduct.price) updateData.price = editedProduct.price;
    if (editedProduct.color) updateData.color = editedProduct.color;
    if (editedProduct.memory) updateData.memory = editedProduct.memory;
    if (editedProduct.pending !== undefined) updateData.pending = editedProduct.pending;
    if (editedProduct.images) updateData.images = editedProduct.images;
    
    // Update the document with the prepared data
    return await updateDoc(productRef, updateData);
};