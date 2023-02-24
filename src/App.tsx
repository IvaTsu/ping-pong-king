import "./App.css";

import { GoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";

import { useSessionStore, useUserStore } from "./store";
import { decodeJWT } from "./utils/decodeJWT";

function App(): JSX.Element {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  const { clear: clearSession, getSession, setSession } = useSessionStore();
  const { clear: clearUser, getUser, setUser } = useUserStore();

  const session = getSession();
  const user = getUser();

  useEffect(() => {
    if (session?.exp != null && new Date(session.exp) < new Date()) {
      setIsUserAuthenticated(true);
    } else {
      setIsUserAuthenticated(false);
    }
  }, [session]);

  const _onSignOutClick = (): void => {
    clearSession();
    clearUser();
  };

  return (
    <div className="App">
      {isUserAuthenticated ? (
        <div>
          <h1>Hello, {user?.name}</h1>
          <img src={user?.picture} referrerPolicy="no-referrer"></img>
          <p>{user?.email}</p>
          <button onClick={_onSignOutClick}>Sign Out</button>
        </div>
      ) : (
        <div className="card">
          <GoogleLogin
            useOneTap
            onSuccess={(credentialResponse) => {
              const userPayload = decodeJWT(credentialResponse.credential);
              setSession({
                jwt: credentialResponse.credential,
                exp: userPayload?.exp,
              });
              setUser({
                email: userPayload?.email,
                family_name: userPayload?.family_name,
                given_name: userPayload?.given_name,
                name: userPayload?.name,
                picture: userPayload?.picture,
              });
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>
      )}
    </div>
  );
}

export default App;
