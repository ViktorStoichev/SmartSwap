import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from './components/main/footer/Footer'
import Header from './components/main/header/Header'
import Profile from './components/auth/profile/Profile';
import Register from './components/auth/register/Register';
import Login from './components/auth/login/Login';
import Logout from './components/auth/Logout';

function App() {

    return (
        <Router>
            <Header />

            <main>
                <Routes>
                    <Route path="/" element={<h1>Main content</h1>} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />
                </Routes>
            </main>

            <Footer />
        </Router>
    )
}

export default App
