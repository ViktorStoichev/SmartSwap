import { auth } from './firebase'
import './App.css'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Logout from './components/auth/Logout'
import Profile from './components/auth/Profile'

function App() {
//   console.log("Firebase Authentication:", auth);
  return (
    <>
        <h1>Firebase Setup Done ✅</h1>
        <Register />
        <Login />
        <Logout />
        <Profile />
    </>
  )
}

export default App
