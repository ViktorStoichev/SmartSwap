import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../server/firebase";
import formatDate from "../utils/formatDate";


export const editPhone = async (phoneId, editedProduct) => {
    const productRef = doc(db, "items", phoneId);
    
    return await updateDoc(productRef, {
        title: editedProduct.title,
        description: editedProduct.description,
        price: editedProduct.price,
        imageUrl: editedProduct.imageUrl,
        updatedAt: formatDate(new Date()),
    });
};