import { useLocation } from "react-router-dom";

import NavigationBar from "../components/NavigationBar";
import GamesHistoryTable from "../components/tables/GamesHistoryTable";
import { WinRate } from "../components/WinRate";

const PlayerHistory = (): JSX.Element => {
  const location = useLocation();
  const { playerId, playerName, winRate, gamesWon, gamesPlayed, rating } =
    location.state;

  return (
    <>
      <NavigationBar />
      <h2 className="mt-10 text-2xl font-bold">
        Games History of {playerName}
      </h2>
      <div className="border-lightGrey mt-10 flex w-full flex-col items-center">
        <div className="card card-side bg-base-100 flex w-full items-center p-3 shadow-xl sm:w-96 sm:p-5">
          <WinRate value={winRate} />
          <div className="pl-5 text-start">
            <p>Rating: {rating}</p>
            <div className="flex justify-start">
              Won {gamesWon} games out of {gamesPlayed}
            </div>
          </div>
        </div>
      </div>
      <GamesHistoryTable playerId={playerId} playerName={playerName} />
    </>
  );
};

export default PlayerHistory;
