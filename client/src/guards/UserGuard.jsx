import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Loader from "../components/main/loader/Loader";

export default function UserGuard() {
    const { user, isLoading } = useAuth();

    if (isLoading) { 
        return (
            <div style={{ position: 'relative', minHeight: '100vh', width: '100%' }}>
                <Loader />
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/404" />
    }

    return <Outlet />;
};