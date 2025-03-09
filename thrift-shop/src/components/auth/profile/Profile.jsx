import './Profile.css';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebase';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Следим за промени в състоянието на автентикацията (влизане/излизане)
        const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
            setUser(authUser);

            if (authUser) {
                // Ако има влязъл потребител, вземаме неговите данни от Firestore
                const userRef = doc(db, 'users', authUser.uid);
                const userDoc = await getDoc(userRef);

                if (userDoc.exists()) {
                    setUserData(userDoc.data());
                    console.log(userData);
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
    }, []);

    if (!user) return <div>Няма влязъл потребител.</div>;
    if (!userData) return <div>Зареждам...</div>;

    return (
        <section className='profile'>
            <h2>Profile</h2>
            <article>
                <div className="user-data">
                    <p><strong>Email:</strong> {user?.email}</p>
                    <p><strong>Username:</strong> {userData.username}</p>
                    <p><strong>Address:</strong> {userData.address}</p>
                </div>
                <div className="user-image">
                    <img src={userData.avatarUrl} alt="Avatar" />
                </div>
            </article>
        </section>
    );
};

export default Profile;
