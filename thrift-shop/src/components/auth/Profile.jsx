import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Следим за промени в състоянието на автентикацията (влизане/излизане)
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
        setUser(authUser);
        if (user) {
          // Ако има влязъл потребител, вземаме неговите данни от Firestore
          const userRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userRef);
  
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            console.log('Няма намерени данни за потребителя.');
          }
        } else {
          console.log('Няма влязъл потребител.');
          setUserData(null); // В случай на излизане, нулираме userData
        }
      });
  
      // Почистване на слушателя при размонтиране на компонента
      return () => unsubscribe();
  }, [auth.currentUser]);

  if (!userData) return <div>Зареждам...</div>;

  return (
    <div>
      <h2>Профил</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Потребителско име:</strong> {userData.username}</p>
      <p><strong>Адрес:</strong> {userData.address}</p>
      <img src={userData.avatarUrl} alt="Avatar" />
    </div>
  );
};

export default Profile;
