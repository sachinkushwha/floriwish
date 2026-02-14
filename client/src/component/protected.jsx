import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const Protected = () => {
    const { data, isLoading, isError } = useAuth();

    if (isLoading) return <p>Loading...</p>

    if (isError) {
        return <Navigate to='/login' replace />
    }

    return (
        <div>
            <Outlet />
        </div>
    )
}
