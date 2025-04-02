import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../server/firebase";


export const createPhonePost = async (phoneData) => {
    const newDocRef = doc(collection(db, "items"));

    phoneData._id = newDocRef.id;

    return await setDoc(newDocRef, phoneData);
}