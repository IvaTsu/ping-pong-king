import "../App.css";

import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

import { LoadingSpinner } from "../components/LoadingSpinner";

function Login(): JSX.Element {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  const _onLogInClick = async (): Promise<void> => {
    try {
      await loginWithRedirect();
    } catch (error) {
      // NOOP
      // TODO: handle error with the Toast notification for the user.
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return !isLoading && isAuthenticated ? (
    <Navigate to="/" replace />
  ) : (
    <div className="App">
      <div className="card">
        <button
          onClick={() => {
            void _onLogInClick();
          }}
        >
          Log In
        </button>
      </div>
    </div>
  );
}

export default Login;
