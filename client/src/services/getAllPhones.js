import { collection, getDocs } from "firebase/firestore";
import { db } from "../../server/firebase";


export const getAllPhones = async () => {
    const querySnapshot = await getDocs(collection(db, "items"));
    const itemsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    return itemsList;
}