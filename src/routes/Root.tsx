import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { fetchPlayer } from "../api/player/get/queries";
import NavigationBar from "../components/NavigationBar";
import { Table } from "../components/Table";
import { useAccessToken } from "../hooks/useAccessToken";
import ProtectedRoute from "../routes/ProtectedRoute";
import { useUserStore } from "../store";

function Root(): JSX.Element {
  const { user } = useAuth0();

  const { accessToken } = useAccessToken();

  const { data: player, isLoading } = useQuery(
    ["player", fetchPlayer, user?.name, accessToken],
    async () =>
      await fetchPlayer({
        accessToken: accessToken as string,
        name: user?.name as string,
      })
  );

  const { setUser, getUser } = useUserStore();
  const currentUser = getUser();

  useEffect(() => {
    if (!isLoading && player?.length !== 0) {
      const currentUser = player?.filter(
        (player) => player.email === user?.email
      )[0];
      if (currentUser != null) {
        setUser(currentUser);
      } else {
        setUser(undefined);
      }
    }
  }, [user?.name, player, currentUser]);

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
