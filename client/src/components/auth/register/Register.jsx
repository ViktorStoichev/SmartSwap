import { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db, registerUser } from '../../../services/firebase';
import { useNavigate } from "react-router-dom";
import './Register.css';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [address, setAddress] = useState('');
    const [avatarUrl, setAvatarUrl] = useState(''); // Просто URL на изображението
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            // Създаване на потребител с имейл и парола
            const user = await registerUser(email, password);

            // Записване на допълнителни данни в Firestore
            const userRef = doc(db, 'users', user.uid);
            const userData = {
                uid: user.uid,
                email: email,
                username: username,
                address: address,
                avatarUrl: avatarUrl, // Просто линк към изображението
            };

            await setDoc(userRef, userData);

            console.log('Потребителят е регистриран успешно с допълнителни данни');
            navigate('/')
        } catch (error) {
            console.error('Грешка при регистрация:', error.message);
        }
    };

    return (
        <div className="register-container">
            <h2 className="register-title">Registration</h2>
            <form onSubmit={handleRegister} className="register-form">
                <input
                    type="email"
                    className="input-field"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="text"
                    className="input-field"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="text"
                    className="input-field"
                    placeholder="Personal address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <input
                    type="text"
                    className="input-field"
                    placeholder="Avatar URL"
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                />
                <input
                    type="password"
                    className="input-field"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="submit-button">Submit</button>
            </form>
        </div>
    );
};

export default Register;

