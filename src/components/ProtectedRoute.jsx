import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, redirectTo = "/" }) => {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to={redirectTo} replace />;
};

export default ProtectedRoute;
