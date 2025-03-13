import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

// 1️⃣ Създаваме контекст
const AuthContext = createContext();

// 2️⃣ Функция за извличане на user данни от Firestore
const fetchUserData = async (userId) => {
  if (!userId) return null;
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);
  return userSnap.exists() ? userSnap.data() : null;
};

// 3️⃣ Компонент за предоставяне на контекста
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const data = await fetchUserData(currentUser.uid);
        setUser({ ...currentUser, ...data });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

// 4️⃣ Hook за достъп до AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
