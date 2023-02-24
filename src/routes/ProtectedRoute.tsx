import "../App.css";

import { Navigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

function ProtectedRoute({ children }: { children: JSX.Element }): JSX.Element {
  const isUserAuthenticated = useAuth();

  if (!isUserAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
