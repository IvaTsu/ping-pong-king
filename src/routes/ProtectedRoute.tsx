import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";

import { fetchPlayer } from "../api/player/get/queries";
import { useAuthStore, useUserStore } from "../store";
import {
  decodeJWT,
  type IDecodedAccessToken,
  type IDecodedIdToken,
} from "../utils/decodeJWT";

function ProtectedRoute({ children }: { children: JSX.Element }): JSX.Element {
  const { getAuth } = useAuthStore();
  const auth = getAuth();
  const { setUser } = useUserStore();

  const userFromIdToken = decodeJWT<IDecodedIdToken>(auth?.idToken);
  const accessTokenDecoded = decodeJWT<IDecodedAccessToken>(auth?.accessToken);

  const { isLoading, isError } = useQuery(
    ["player", fetchPlayer, auth?.accessToken, userFromIdToken?.name],
    async () =>
      await fetchPlayer({
        accessToken: auth?.accessToken as string,
        name: userFromIdToken?.name as string,
      }),
    {
      enabled: userFromIdToken?.name != null && auth?.accessToken != null,
      onSuccess: (player) => {
        const currentUser = player?.filter(
          (player) => player.email === userFromIdToken?.email
        )[0];
        if (currentUser != null) {
          setUser(currentUser);
        } else {
          setUser(undefined);
        }
      },
    }
  );

  if (
    (!isLoading && isError) ||
    auth?.accessToken === undefined ||
    (accessTokenDecoded?.exp != null &&
      new Date(accessTokenDecoded.exp * 1000) < new Date())
  ) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
