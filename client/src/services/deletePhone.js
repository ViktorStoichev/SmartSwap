import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../server/firebase";
import { deleteImage } from "./photoService";

export const deletePhone = async (phoneId, images) => {
    // Delete all images from the server
    for (const img of images) {
        if (img && img.public_id) {
            try {
                await deleteImage(img.public_id);
            } catch {
                console.log("Failed to delete image");
            }
        }
    }
    // Delete the Firestore document
    return await deleteDoc(doc(db, "items", phoneId));
};