import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { fetchGamesByUserId } from "../api/game/get/queries";
import { useAuthStore, useUserStore } from "../store";
import getRandomEmoji from "../utils/getRandomEmoji";
import { LoadingSpinner } from "./LoadingSpinner";

export const GamesHistory = (): JSX.Element => {
  const { getAuth } = useAuthStore();
  const auth = getAuth();

  const { getUser } = useUserStore();
  const currentUser = getUser();

  const { data: gameList, isLoading: isGameListLoading } = useQuery(
    ["gamesByUserId", fetchGamesByUserId, auth?.accessToken],
    async () =>
      await fetchGamesByUserId(
        auth?.accessToken as string,
        currentUser?.id as string
      ),
    {
      enabled: auth?.accessToken != null && currentUser?.id != null,
    }
  );

  const gameHistory = useMemo(() => {
    return gameList?.content.map((game) => {
      const date = new Date(game.playedWhen).toISOString().split("T")[0];
      const { gameResult, playerRefB, playerRefA } = game;
      const { winnerId } = gameResult;
      const opponentName =
        playerRefB.name === currentUser?.name
          ? playerRefA.name
          : playerRefB.name;
      const id = game.id;
      const isWinner = winnerId === currentUser?.id;
      return {
        opponentName,
        won: isWinner,
        score: `${gameResult.playerAScore} : ${gameResult.playerBScore}`,
        gainOrLoss: isWinner
          ? Math.max(
              gameResult.playerARatingAlteration,
              gameResult.playerBRatingAlteration
            )
          : Math.min(
              gameResult.playerARatingAlteration,
              gameResult.playerBRatingAlteration
            ),
        date,
        id,
      };
    });
  }, [gameList?.content]);

  return (
    <>
      {gameHistory != null && gameHistory.length > 0 ? (
        <div className="mt-10 w-full flex items-start border-lightGrey flex-col sm:w-3/4">
          <p className="text-2xl font-ubuntuBold  text-navy dark:text-aqua mb-3 ml-10">
            Game history
          </p>
          <div className="card card-side bg-base-100 shadow-xl w-full flex flex-col p-2 sm:p-2 max-h-96 overflow-auto text-xs sm:text-base border border-lightGrey rounded dark:border-0">
            <div className="flex w-full items-start justify-start text-center border-b-2 border-cloud dark:border-lightGrey">
              {["Opponent", "Result", "Score", "Gain/Loss", "Date"].map(
                (header) => {
                  return (
                    <p
                      className="w-1/4 font-ubuntuBold mb-2 text-center"
                      key={header}
                    >
                      {header}
                    </p>
                  );
                }
              )}
            </div>
            <div className="p-2 flex flex-col">
              {gameHistory.map((game) => {
                const { opponentName, won, date, score, gainOrLoss } = game;
                return (
                  <div
                    className="flex w-full items-start justify-start text-center py-2 border-b border-darkGrey  dark:border-lightGrey"
                    key={game.id}
                  >
                    <p className="w-1/5">{opponentName}</p>
                    <div className="w-1/5 flex justify-center">
                      {won ? (
                        <img src="check.svg" className="w-6" />
                      ) : (
                        <img src="denied.svg" className="w-6 color-rose" />
                      )}
                    </div>
                    <p className="w-1/5">{score}</p>
                    <p className="w-1/5">
                      {isNaN(gainOrLoss) ? (
                        <span aria-hidden="true" role="img">
                          {getRandomEmoji()}
                        </span>
                      ) : gainOrLoss > 0 ? (
                        <span className="text-middleGreen">{gainOrLoss}</span>
                      ) : (
                        <span className="text-rose">{gainOrLoss}</span>
                      )}
                    </p>
                    <p className="w-1/5">{date}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : !isGameListLoading &&
        gameHistory != null &&
        gameHistory.length === 0 ? (
        <div className="card flex justify-center bg-aqua dark:bg-cloudBirst w-full sm:w-96 h-16 mt-10">
          You haven&apos;t played any games yet!
        </div>
      ) : isGameListLoading ? (
        <LoadingSpinner />
      ) : (
        <></>
      )}
    </>
  );
};
