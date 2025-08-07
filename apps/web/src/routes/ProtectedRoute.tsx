import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function ProtectedRoute({ children }: { children: JSX.Element }): JSX.Element {
  const { isAuthenticated, isLoading } = useAuth0();

  if (!isLoading && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
