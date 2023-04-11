import { useLocation } from "react-router-dom";

import NavigationBar from "../components/NavigationBar";
import GamesHistoryTable from "../components/tables/GamesHistoryTable";

const PlayerHistory = (): JSX.Element => {
  const location = useLocation();
  const { playerId, playerName } = location.state;

  return (
    <>
      <NavigationBar />
      <h2 className="mt-10 text-2xl font-bold">
        Games History of {playerName}
      </h2>
      <GamesHistoryTable playerId={playerId} playerName={playerName} />
    </>
  );
};

export default PlayerHistory;
