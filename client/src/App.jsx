// Main App Component
// Root component that sets up routing, authentication, and application structure
// Manages route protection, layout components, and navigation flow

import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from './components/main/footer/Footer'
import Header from './components/main/header/Header'
import Profile from './components/auth/profile/Profile';
import Register from './components/auth/register/Register';
import Login from './components/auth/login/Login';
import About from './components/main/about/About';
import NotFoundPage from './components/main/404/404';
import SellPhone from './components/items/sell-phone/SellPhone';
import Catalog from './components/items/catalog/Catalog';
import { AuthProvider } from './contexts/AuthContext';
import Details from './components/items/details/Details';
import EditPhone from './components/items/edit-phones/EditPhone';
import LikedPhones from './components/items/liked-phones/LikedPhones';
import Home from './components/main/home/Home';
import UserGuard from './guards/UserGuard';
import GuestGuard from './guards/GuestGuard';
import ChatList from './components/chat/ChatList';
import Chat from './components/chat/Chat';
import ScrollToTop from './utils/ScrollToTop';
import AdminGuard from './guards/AdminGuard';
import Admin from './components/auth/admin/Admin';
import AppGate from './utils/AppGate';
import Contacts from './components/main/contacts/Contacts';

function App() {

    return (
        <Router>
            {/* App Gate handles authentication state and loading */}
            <AppGate>
                {/* Authentication context provider for user state management */}
                <AuthProvider>
                    {/* Auto-scroll to top on route changes */}
                    <ScrollToTop />
                    
                    {/* Main navigation header */}
                    <Header />
                    
                    {/* Main content area with routing */}
                    <main>
                        <Routes>
                            {/* Public routes - accessible to all users */}
                            <Route path="/" element={<Home />} />
                            
                            {/* Protected routes - require user authentication */}
                            <Route element={<UserGuard />}>
                                <Route path="/profile/:id" element={<Profile />} />
                                <Route path="/phones/sell" element={<SellPhone />} />
                                <Route path="/phones/liked" element={<LikedPhones />} />
                                <Route path="/phones/:id/edit" element={<EditPhone />} />
                                <Route path="/chat-list" element={<ChatList />} />
                                <Route path="/chat/:partnerId" element={<Chat />} />
                                
                                {/* Admin routes - require admin privileges */}
                                <Route element={<AdminGuard />}>
                                    <Route path="/admin" element={<Admin />} />
                                </Route>
                            </Route>
                            
                            {/* Guest routes - only accessible to non-authenticated users */}
                            <Route element={<GuestGuard />}>
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                            </Route>
                            
                            {/* Public catalog and details routes */}
                            <Route path="/phones" element={<Catalog />} />
                            <Route path="/phones/:id" element={<Details />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/contacts" element={<Contacts />} />
                            
                            {/* Error handling routes */}
                            <Route path="/404" element={<NotFoundPage />} />
                            <Route path="*" element={<NotFoundPage />} />
                        </Routes>
                    </main>
                    
                    {/* Site footer */}
                    <Footer />
                </AuthProvider>
            </AppGate>
        </Router>
    )
}

export default App
