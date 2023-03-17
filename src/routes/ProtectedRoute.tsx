import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";

import { fetchPlayer } from "../api/player/get/queries";
import { useAuthStore } from "../store";
import { decodeJWT } from "../utils/decodeJWT";

function ProtectedRoute({ children }: { children: JSX.Element }): JSX.Element {
  const { getAuth } = useAuthStore();
  const auth = getAuth();

  const userFromIdToken = decodeJWT(auth?.idToken);

  const { isLoading, isError } = useQuery(
    ["player", fetchPlayer, auth?.accessToken, userFromIdToken?.name],
    async () =>
      await fetchPlayer({
        accessToken: auth?.accessToken as string,
        name: userFromIdToken?.name as string,
      }),
    { enabled: userFromIdToken?.name != null }
  );

  if (!isLoading && auth?.accessToken === undefined && isError) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
