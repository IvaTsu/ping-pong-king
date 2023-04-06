import { useLocation } from "react-router-dom";

import NavigationBar from "../components/NavigationBar";
import GamesHistoryTable from "../components/tables/GamesHistoryTable";

const PlayerHistory = (): JSX.Element => {
  const location = useLocation();
  const { playerId, playerName } = location.state;

  return (
    <>
      <NavigationBar />
      <p>{playerName} Games History</p>
      <GamesHistoryTable playerId={playerId} playerName={playerName} />
    </>
  );
};

export default PlayerHistory;
