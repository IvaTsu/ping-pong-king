import "../App.css";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

import { fetchGamesByUserId } from "../api/game/get/queries";
import { createPlayer } from "../api/player/post/mutations";
import { type IPostPlayerBody } from "../api/player/post/types";
import { fetchTournamentList } from "../api/tournament/get/queries";
import { LoadingSpinner } from "../components/LoadingSpinner";
import NavigationBar from "../components/NavigationBar";
import { fiveMinutes } from "../constants/time";
import ProtectedRoute from "../routes/ProtectedRoute";
import { useAuthStore, useUserStore } from "../store";
import { decodeJWT, type IDecodedIdToken } from "../utils/decodeJWT";

function Profile(): JSX.Element {
  const [tournamentId, setTournamentId] = useState<string>();
  const { getAuth } = useAuthStore();
  const auth = getAuth();
  const userFromIdToken = decodeJWT<IDecodedIdToken>(auth?.idToken);
  const { setUser } = useUserStore();

  const { data: tournamentList } = useQuery(
    ["tournamentList", fetchTournamentList, auth?.accessToken],
    async () => await fetchTournamentList(auth?.accessToken as string),
    { enabled: auth?.accessToken != null }
  );

  const { mutate: createPlayerMutation } = useMutation({
    mutationFn: createPlayer,
    onSuccess: (player) => {
      setUser(player);
    },
  });

  const { getUser } = useUserStore();
  const currentUser = getUser();

  const { data: gameList, isLoading } = useQuery(
    ["gamesByUserId", fetchGamesByUserId, auth?.accessToken],
    async () =>
      await fetchGamesByUserId(
        auth?.accessToken as string,
        currentUser?.id as string
      ),
    {
      enabled: auth?.accessToken != null && currentUser?.id != null,
      staleTime: fiveMinutes,
    }
  );

  const gameHistory = useMemo(() => {
    return gameList?.content.map((game) => {
      const date = new Date(game.playedWhen).toISOString().split("T")[0];
      const { gameResult, playerRefB, playerRefA } = game;
      const opponentName =
        playerRefB.name === currentUser?.name
          ? playerRefA.name
          : playerRefB.name;
      const id = game.id;
      return {
        opponentName,
        won: gameResult.playerAScore > gameResult.playerBScore,
        score: `${gameResult.playerAScore} : ${gameResult.playerBScore}`,
        date,
        id,
      };
    });
  }, [gameList?.content]);

  const _onTournamentChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setTournamentId(e.target.value);
  };

  const _onTournamentSubmit = (
    accessToken: string,
    body: IPostPlayerBody
  ): void => {
    createPlayerMutation({ accessToken, body });
  };

  return (
    <ProtectedRoute>
      <>
        <NavigationBar />
        <div className="flex items-center flex-col">
          {currentUser == null ? (
            <div>
              <h1>Hello, {userFromIdToken?.name}</h1>
              <p className="my-5">Assign yourself to the Office</p>

              <select
                className="mb-5 mr-5 select select-info w-full max-w-xs"
                defaultValue={"DEFAULT"}
                onChange={_onTournamentChange}
              >
                <option value={"DEFAULT"} disabled>
                  Select office
                </option>
                {tournamentList?.map((tournament) => {
                  return (
                    <option key={tournament.id} value={tournament.id}>
                      {tournament.name}
                    </option>
                  );
                })}
              </select>
              <button
                className={`btn btn-ghost ${
                  tournamentId != null
                    ? "btn-outline btn-success"
                    : "btn-disabled"
                }  ${isLoading ? "loading" : ""}`}
                onClick={() => {
                  if (
                    auth?.accessToken != null &&
                    tournamentId != null &&
                    userFromIdToken != null
                  ) {
                    _onTournamentSubmit(auth?.accessToken, {
                      name: userFromIdToken.name,
                      email: userFromIdToken.email,
                      profileImage: userFromIdToken.picture,
                      tournamentRef: {
                        id: tournamentId,
                      },
                    });
                  }
                }}
              >
                Assign
              </button>
            </div>
          ) : (
            <div className="card card-side bg-base-100 shadow-xl mt-10 w-full sm:w-96 p-3 sm:p-5 flex">
              <figure className="rounded-none">
                <img
                  src={currentUser.profileImage}
                  alt={`Picture of ${currentUser.name}`}
                  className="rounded-md border-darkGrey border-2"
                />
              </figure>
              <div className="text-start pl-5">
                <p className="text-navy dark:text-aqua font-ubuntuRegular  text-l sm:text-xl pb-2">
                  {currentUser.name}
                </p>
                <p>{currentUser.email}</p>
                <p>Rating: {currentUser.rating}</p>
                <p>Games played: {currentUser.gamesPlayed}</p>
              </div>
            </div>
          )}

          {gameHistory != null && gameHistory.length > 0 ? (
            <div className="mt-10 w-full flex items-start border-lightGrey flex-col sm:w-3/4">
              <p className="text-2xl font-ubuntuBold  text-navy dark:text-aqua mb-3 ml-10">
                Game history
              </p>
              <div className="card card-side bg-base-100 shadow-xl w-full flex flex-col p-2 sm:p-2 max-h-96 overflow-auto text-xs sm:text-base border border-lightGrey rounded dark:border-0">
                <div className="flex w-full items-start justify-start text-center border-b-2 border-cloud dark:border-lightGrey">
                  {["Opponent", "Result", "Score", "Date"].map((header) => {
                    return (
                      <p
                        className="w-1/4 font-ubuntuBold mb-2 text-center"
                        key={header}
                      >
                        {header}
                      </p>
                    );
                  })}
                </div>
                <div className="p-2 flex flex-col">
                  {gameHistory.map((game) => {
                    const { opponentName, won, date, score } = game;
                    return (
                      <div
                        className="flex w-full items-start justify-start text-center py-2 border-b border-darkGrey  dark:border-lightGrey"
                        key={game.id}
                      >
                        <p className="w-1/4">{opponentName}</p>
                        <div className="w-1/4 flex justify-center">
                          {won ? (
                            <img src="check.svg" className="w-6" />
                          ) : (
                            <img src="denied.svg" className="w-6 color-rose" />
                          )}
                        </div>
                        <p className="w-1/4">{score}</p>
                        <p className="w-1/4">{date}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : !isLoading ? (
            <div className="card flex justify-center bg-aqua dark:bg-cloudBirst w-full sm:w-96 h-16 mt-10">
              You haven't played any games yet!
            </div>
          ) : (
            <LoadingSpinner />
          )}
        </div>
      </>
    </ProtectedRoute>
  );
}

export default Profile;
