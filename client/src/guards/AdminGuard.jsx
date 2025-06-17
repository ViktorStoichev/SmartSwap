import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AdminGuard = () => {
    const { user } = useAuth();

    if (!user || !user.admin) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default AdminGuard; 