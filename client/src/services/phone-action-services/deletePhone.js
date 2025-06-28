// Delete Phone Service
// Deletes a phone listing and its associated images
// Handles both Firestore document deletion and cloud storage image cleanup

import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../server/firebase";
import { deleteImage } from "../image-services/photoService";

export const deletePhone = async (phoneId, images) => {
    // Delete all associated images from cloud storage first
    for (const img of images) {
        if (img && img.public_id) {
            try {
                // Attempt to delete each image using its public_id
                await deleteImage(img.public_id);
            } catch {
                // Log failure but continue with other images and document deletion
                console.log("Failed to delete image");
            }
        }
    }
    
    // Delete the Firestore document after image cleanup
    return await deleteDoc(doc(db, "items", phoneId));
};