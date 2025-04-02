import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../server/firebase";

export const deletePhone = async (phoneId) => {
    return await deleteDoc(doc(db, "items", phoneId));
};