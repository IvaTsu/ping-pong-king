import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { fetchPlayer } from "../api/player/get/queries";
import NavigationBar from "../components/NavigationBar";
import { Table } from "../components/Table";
import ProtectedRoute from "../routes/ProtectedRoute";
import { useAuthStore, useUserStore } from "../store";
import { decodeJWT, type IDecodedIdToken } from "../utils/decodeJWT";

function Root(): JSX.Element {
  const { getAuth } = useAuthStore();
  const auth = getAuth();

  const userFromIdToken = decodeJWT<IDecodedIdToken>(auth?.idToken);

  const { data: player, isLoading } = useQuery(
    ["player", fetchPlayer, auth?.accessToken, userFromIdToken?.name],
    async () =>
      await fetchPlayer({
        accessToken: auth?.accessToken as string,
        name: userFromIdToken?.name as string,
      }),
    { refetchOnMount: "always" }
  );

  const { setUser, getUser } = useUserStore();
  const currentUser = getUser();

  useEffect(() => {
    if (!isLoading && player?.length !== 0) {
      const currentUser = player?.filter(
        (player) => player.email === userFromIdToken?.email
      )[0];
      if (currentUser != null) {
        setUser(currentUser);
      } else {
        setUser(undefined);
      }
    }
  }, [userFromIdToken?.email, player, currentUser]);

  return (
    <ProtectedRoute>
      <>
        <NavigationBar />
        <Table />
      </>
    </ProtectedRoute>
  );
}

export default Root;
