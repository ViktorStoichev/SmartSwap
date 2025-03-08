import { logoutUser } from "../../firebase";

const Logout = () => {
  const handleLogout = async () => {
    await logoutUser();
    alert("Излезе успешно!");
  };

  return <button onClick={handleLogout}>Изход</button>;
};

export default Logout;
