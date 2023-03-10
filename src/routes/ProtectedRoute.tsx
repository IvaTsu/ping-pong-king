import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

import { LoadingSpinner } from "../components/LoadingSpinner";

function ProtectedRoute({ children }: { children: JSX.Element }): JSX.Element {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isLoading && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
