import "../App.css";

import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

import { createToken } from "../api/auth/post/mutations";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useQueryParams } from "../hooks/useQueryParams";
import { useAuthStore } from "../store";

function Login(): JSX.Element {
  const { setAuth, getAuth } = useAuthStore();
  const query = useQueryParams();
  const code = query.get("code");

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

  if (getAuth()?.accessToken != null) {
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
          <a href={encodeURI(import.meta.env.VITE_AUTH0_AUTHORIZE)}>Log in</a>
        )}
      </div>
    </div>
  );
}

export default Login;
