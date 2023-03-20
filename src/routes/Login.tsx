import "../App.css";

import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

import { createToken } from "../api/auth/post/mutations";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useQueryParams } from "../hooks/useQueryParams";
import { useAuthStore } from "../store";
import { decodeJWT, type IDecodedAccessToken } from "../utils/decodeJWT";

function Login(): JSX.Element {
  const { setAuth, getAuth } = useAuthStore();
  const auth = getAuth();
  const query = useQueryParams();
  const code = query.get("code");
  const accessTokenDecoded = decodeJWT<IDecodedAccessToken>(auth?.accessToken);

  const {
    mutate: createTokenMutation,
    isLoading: isCreateTokenLoading,
    isSuccess,
  } = useMutation({
    mutationFn: createToken,
    onSuccess: (data) => {
      setAuth({
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        idToken: data.id_token,
      });
    },
  });

  useEffect(() => {
    if (code != null) {
      createTokenMutation({
        body: new URLSearchParams({
          grant_type: "authorization_code",
          client_id: import.meta.env.VITE_AUTH0_CLIENT_ID,
          client_secret: import.meta.env.VITE_AUTH0_CLIENT_SECRET,
          code,
          redirect_uri: import.meta.env.VITE_CLIENT,
        }),
      });
    }
  }, []);

  if (
    auth?.accessToken != null &&
    accessTokenDecoded?.exp != null &&
    new Date(accessTokenDecoded.exp) > new Date()
  ) {
    return <Navigate to="/" replace />;
  }

  return isSuccess ? (
    <Navigate to="/" replace />
  ) : (
    <div className="App">
      <div className="card">
        {code != null || isCreateTokenLoading ? (
          <LoadingSpinner />
        ) : (
          <a
            href={encodeURI(
              `https://${
                import.meta.env.VITE_AUTH0_DOMAIN as string
              }/authorize?response_type=code&client_id=${
                import.meta.env.VITE_AUTH0_CLIENT_ID as string
              }&redirect_uri=${
                import.meta.env.VITE_CLIENT_REDIRECT as string
              }&scope=${import.meta.env.VITE_AUTH0_SCOPE as string}&audience=${
                import.meta.env.VITE_API_AUDIENCE_URL as string
              }&state=${import.meta.env.VITE_AUTH0_STATE as string}`
            )}
          >
            Log in
          </a>
        )}
      </div>
    </div>
  );
}

export default Login;
