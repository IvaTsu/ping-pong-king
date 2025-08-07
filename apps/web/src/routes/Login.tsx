import "../App.css";

import AnalyticsNotification from "../components/notifications/AnalyticsNotification";
import { useAuth0 } from "@auth0/auth0-react";

function Login(): JSX.Element {
  const { loginWithRedirect } = useAuth0();

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
            <button onClick={() => loginWithRedirect()}>Log In</button>
          </div>
        </div>
        <AnalyticsNotification />
      </div>
    </>
  );
}

export default Login;
