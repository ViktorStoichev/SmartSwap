import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";


export default function GuestGuard() {
    const { user } = useAuth();

    if (user) {
        return <Navigate to="/404" />
    }

    return <Outlet />;
};