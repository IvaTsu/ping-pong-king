import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

import router from "./router/router";
import { AuthProvider } from "./contexts/AuthContext";
import Auth0Debug from "./components/Auth0Debug";
import { AxiosAuthSetup } from "./components/AxiosAuthSetup";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Auth0Provider
    domain={import.meta.env.VITE_AUTH0_DOMAIN as string}
    clientId={import.meta.env.VITE_AUTH0_CLIENT_ID as string}
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: import.meta.env.VITE_AUTH0_AUDIENCE as string,
      scope: "openid profile email read:games create:games",
    }}
    useRefreshTokens={true}
    cacheLocation="localstorage"
  >
    <Auth0Debug />
    <AuthProvider>
      <AxiosAuthSetup>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </AxiosAuthSetup>
    </AuthProvider>
  </Auth0Provider>
);
