import { doc, getDoc } from "firebase/firestore";
import { db } from "../../server/firebase";


export const getOnePhone = async (phoneId) => {
    const docRef = doc(db, "items", phoneId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
    }

    return;
}