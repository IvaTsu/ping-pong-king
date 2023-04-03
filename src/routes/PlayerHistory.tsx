import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";

import { fetchGamesByUserId } from "../api/game/get/queries";
import { fiveMinutes } from "../constants/time";
import { useAuthStore } from "../store";

const PlayerHistory = (): JSX.Element => {
  const location = useLocation();
  const { playerId } = location.state;

  const params = useParams();
  const { playerName } = params;

  const { getAuth } = useAuthStore();
  const auth = getAuth();

  const { data: games } = useQuery(
    ["playerHistory", playerId],
    async () => await fetchGamesByUserId(auth?.accessToken as string, playerId),
    {
      enabled: auth?.accessToken != null,
      staleTime: fiveMinutes,
    }
  );

  return (
    <>
      <p>{playerId}</p>
      <p>{playerName}</p>
      <pre>{JSON.stringify(games)}</pre>
    </>
  );
};

export default PlayerHistory;
