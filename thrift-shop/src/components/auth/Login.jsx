import { useState } from "react";
import { loginUser } from "../../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      alert("Успешно влизане!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Вход</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Имейл" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Парола" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Вход</button>
      </form>
    </div>
  );
};

export default Login;
