import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../server/firebase";
import { editPhone } from './editPhone';
import { deletePhone } from './deletePhone';

export const getPendingPhones = async () => {
    const q = query(collection(db, "items"), where("pending", "==", true));
    const querySnapshot = await getDocs(q);
    const itemsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    return itemsList;
};

export const approvePhone = async (phoneId) => {
    return await editPhone(phoneId, { pending: false });
};

export const rejectPhone = async (phoneId, images) => {
    return await deletePhone(phoneId, images);
}; 