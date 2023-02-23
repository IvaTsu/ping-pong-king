import "./App.css";

import { GoogleLogin } from "@react-oauth/google";

import { useSessionStore, useUserStore } from "./store";
import { decodeJWT } from "./utils/decodeJWT";

function App(): JSX.Element {
  const { getSession, setSession } = useSessionStore();
  const { getUser, setUser } = useUserStore();

  const session = getSession();
  const user = getUser();

  return (
    <div className="App">
      {session != null ? (
        <div>
          <h1>Hello, {user?.name}</h1>
          <img src={user?.picture} referrerPolicy="no-referrer"></img>
          <p>{user?.email}</p>
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
