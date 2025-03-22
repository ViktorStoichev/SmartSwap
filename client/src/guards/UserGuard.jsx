import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Loader from "../components/main/loader/Loader";

export default function UserGuard() {
    const { user, isLoading } = useAuth();

    if (isLoading) { 
        <Loader />
        return null; // Изчаква стойността на user
    }

    if (!user) {
        return <Navigate to="/404" />
    }

    return <Outlet />;
};