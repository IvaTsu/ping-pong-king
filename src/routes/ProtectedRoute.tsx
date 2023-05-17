import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";

import { fetchPlayer } from "../api/player/get/queries";
import { thirtyMinutes } from "../constants/time";
import { useAuthStore, useUserStore } from "../store";
import { decodeJWT, type IDecodedIdToken } from "../utils/decodeJWT";

function ProtectedRoute({ children }: { children: JSX.Element }): JSX.Element {
  const { getAuth } = useAuthStore();
  const auth = getAuth();
  const { setUser } = useUserStore();

  const userFromIdToken = decodeJWT<IDecodedIdToken>(auth?.idToken);

  const { isLoading, isError } = useQuery(
    ["player", fetchPlayer, userFromIdToken?.name],
    async () =>
      await fetchPlayer({
        name: userFromIdToken?.name as string,
      }),
    {
      enabled: userFromIdToken?.name != null,
      staleTime: thirtyMinutes,
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

  if ((!isLoading && isError) || auth?.accessToken === undefined) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
