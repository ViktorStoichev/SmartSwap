import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from './components/main/footer/Footer'
import Header from './components/main/header/Header'
import Profile from './components/auth/profile/Profile';
import Register from './components/auth/register/Register';
import Login from './components/auth/login/Login';
import About from './components/main/about/About';
import NotFoundPage from './components/main/404/404';

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
                    <Route path="/about" element={<About />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </main>

            <Footer />
        </Router>
    )
}

export default App
