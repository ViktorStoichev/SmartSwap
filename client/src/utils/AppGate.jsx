import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../server/firebase';
import Loader from '../components/main/loader/Loader';

export default function AppGate({ children }) {
    const [ready, setReady] = useState(false);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user && localStorage.getItem('redirectAfterLogout') === 'true') {
                localStorage.removeItem('redirectAfterLogout');
                setRedirect(true);
            } else {
                setReady(true);
            }
        });
        return () => unsubscribe();
    }, []);

    if (!ready && !redirect) {
        return <Loader />;
    }
    if (redirect) {
        window.location.replace('/');
        return <Loader />;
    }
    return children;
} 