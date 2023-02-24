import "../App.css";

import { GoogleLogin } from "@react-oauth/google";
import { Navigate, useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import { useSessionStore, useUserStore } from "../store";
import { decodeJWT } from "../utils/decodeJWT";

function Login(): JSX.Element {
  const { setSession } = useSessionStore();
  const { setUser } = useUserStore();
  const navigate = useNavigate();
  const isUserAuthenticated = useAuth();

  return isUserAuthenticated ? (
    <Navigate to="/" replace />
  ) : (
    <div className="App">
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
            navigate("/");
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </div>
    </div>
  );
}

export default Login;
