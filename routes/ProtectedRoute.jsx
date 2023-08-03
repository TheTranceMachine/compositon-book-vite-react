import { useAuth } from "../src/hooks/useAuth";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ redirectPath = "/authenticate", children }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export { ProtectedRoute };
