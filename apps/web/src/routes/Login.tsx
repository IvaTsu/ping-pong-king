import "../App.css";

import { useAuth0 } from "@auth0/auth0-react";
import AnalyticsNotification from "../components/notifications/AnalyticsNotification";

function Login(): JSX.Element {
  const { loginWithRedirect, isLoading, error } = useAuth0();

  const handleLogin = () => {
    try {
      loginWithRedirect();
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  if (error) {
    console.error("Auth0 error in Login component:", error);
  }

  return (
    <>
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Welcome to Ping Pong King 👑</h1>
          <p className="py-6">
            It will help you to track your ping pong games and count you in the
            {` `}
            <a href="https://www.hiarcs.com/hce-manual/pc/Eloratings.html">
              ELO-based
            </a>
            {` `}
            rating system.
          </p>
          <div className="indicator">
            <span className="indicator-item badge badge-secondary">
              with Google
            </span>
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className={isLoading ? "opacity-50 cursor-not-allowed" : ""}
            >
              {isLoading ? "Loading..." : "Log In"}
            </button>
          </div>
          {error && (
            <div className="text-red-500 mt-4">
              Auth0 Error: {error.message}
            </div>
          )}
        </div>
        <AnalyticsNotification />
      </div>
    </>
  );
}

export default Login;
