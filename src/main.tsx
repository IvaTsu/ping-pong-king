import "./index.css";

import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import router from "./router/router";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GoogleOAuthProvider
      clientId={`${
        (import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID as string | undefined) !=
        null
          ? (import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID as string)
          : ""
      }`}
    >
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
