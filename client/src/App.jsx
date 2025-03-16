import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from './components/main/footer/Footer'
import Header from './components/main/header/Header'
import Profile from './components/auth/profile/Profile';
import Register from './components/auth/register/Register';
import Login from './components/auth/login/Login';
import About from './components/main/about/About';
import NotFoundPage from './components/main/404/404';
import AddItem from './components/items/add-item/addItem';
import Catalog from './components/items/catalog/Catalog';
import { AuthProvider } from './contexts/AuthContext';
import Details from './components/items/details/Details';
import EditItem from './components/items/edit-item/EditItem';
import Loader from './components/loader/Loader';

function App() {

    return (
        <Router>
            <AuthProvider>
                <Header />

                <main>
                    <Routes>
                        <Route path="/" element={<h1>Main content</h1>} />
                        <Route path="/profile/:id" element={<Profile />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/items/add" element={<AddItem />} />
                        <Route path="/items" element={<Catalog />} />
                        <Route path="/items/:id" element={<Details />} />
                        <Route path="/items/:id/edit" element={<EditItem />} />
                        <Route path="/about" element={<About />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </main>

                <Footer />
            </AuthProvider>
        </Router>
    )
}

export default App
