import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db, registerUser } from '../../firebase';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [address, setAddress] = useState('');
  const [avatarUrl, setAvatarUrl] = useState(''); // Просто URL на изображението

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Създаване на потребител с имейл и парола
      const user = await registerUser(email, password);

      // Записване на допълнителни данни в Firestore
      const userRef = doc(db, 'users', user.uid);
      const userData = {
        username: username,
        address: address,
        avatarUrl: avatarUrl, // Просто линк към изображението
      };

      await setDoc(userRef, userData);

      console.log('Потребителят е регистриран успешно с допълнителни данни');
    } catch (error) {
      console.error('Грешка при регистрация:', error.message);
    }
  };

  return (
    <div>
      <h2>Регистрация</h2>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Имейл"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Парола"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Потребителско име"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Адрес"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="Линк към аватар"
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
        />
        <button type="submit">Регистрирай се</button>
      </form>
    </div>
  );
};

export default Register;

