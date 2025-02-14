import { Navigate, useLocation } from "react-router";
import { tokenService } from "../services/token.service";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = tokenService.getToken();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
