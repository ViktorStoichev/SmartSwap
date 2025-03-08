import { useState } from 'react'
import { auth } from './firebase'
import './App.css'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Logout from './components/auth/Logout'
import AuthStatus from './components/auth/AuthStatus'
import Profile from './components/auth/Profile'

function App() {
  const [count, setCount] = useState(0)

  console.log("Firebase Authentication:", auth);
  return (
    <>
        <h1>Firebase Setup Done ✅</h1>
        <AuthStatus />
        <Register />
        <Login />
        <Logout />
        <Profile />
    </>
  )
}

export default App
