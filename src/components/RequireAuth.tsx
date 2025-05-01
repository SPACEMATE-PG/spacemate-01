
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types";

interface RequireAuthProps {
  children: JSX.Element;
  allowedRole: UserRole;
}

const RequireAuth = ({ children, allowedRole }: RequireAuthProps) => {
  const { isAuthenticated, userRole } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect them to the login page, but save the current location they were
    // trying to go to when they were redirected.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (userRole !== allowedRole) {
    // If they're authenticated but don't have the correct role
    return <Navigate to="/role-selection" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
