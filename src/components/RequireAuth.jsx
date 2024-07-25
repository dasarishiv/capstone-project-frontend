import { useLocation, Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

export const RequireAuth = () => {
  const { authenticatedUser } = useAuth();
  const location = useLocation();
  console.log("Location in Require Auth", location);

  return authenticatedUser ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
};
