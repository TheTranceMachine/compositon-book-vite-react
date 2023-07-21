import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../src/Auth";

const ProtectedRoute = ({ redirectPath = "/authenticate", children }) => {
  const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export { ProtectedRoute };
