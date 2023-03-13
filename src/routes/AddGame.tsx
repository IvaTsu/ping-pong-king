import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createGame } from "../api/game/post/mutations";
import { fetchPlayer } from "../api/player/get/queries";
import { LoadingSpinner } from "../components/LoadingSpinner";
import NavigationBar from "../components/NavigationBar";
import { PlayersSearchList } from "../components/PlayersSearchList";
import { SearchOpponentByName } from "../components/SearchOpponentByName";
import { Steps } from "../components/Steps";
import { useAccessToken } from "../hooks/useAccessToken";
import { useDebounce } from "../hooks/useDebounce";
import { paths } from "../router/router";
import { useOpponentStore, useUserStore } from "../store";
import ProtectedRoute from "./ProtectedRoute";

export default function AddGame(): JSX.Element {
  const navigate = useNavigate();
  const [opponentSearchedValue, setOpponentSearchedValue] = useState("");
  const [currentUserScore, setCurrentUserScore] = useState<number | undefined>(
    undefined
  );
  const [opponentScore, setOpponentScore] = useState<number | undefined>(
    undefined
  );
  const debouncedOpponentSearchValue = useDebounce<string>(
    opponentSearchedValue,
    500
  );

  const { accessToken } = useAccessToken();
  const { data: playersList, isLoading } = useQuery(
    ["player", fetchPlayer, accessToken, debouncedOpponentSearchValue],
    async () =>
      await fetchPlayer({
        accessToken: accessToken as string,
        name: debouncedOpponentSearchValue,
      })
  );
  const { mutate: createGameMutation, isSuccess } = useMutation({
    mutationFn: createGame,
  });
  const { getUser } = useUserStore();
  const currentUser = getUser();
  const { getOpponent, clear: clearOpponent } = useOpponentStore();
  const currentOpponent = getOpponent();

  const _onCreateGameClick = (): void => {
    if (
      accessToken != null &&
      currentUserScore != null &&
      opponentScore != null
    ) {
      createGameMutation({
        accessToken,
        body: {
          playerRefA: {
            id: currentUser?.id,
          },
          playerRefB: {
            id: currentOpponent?.id,
          },
          // TODO: this should be a separate selector
          tournamentRef: {
            id: currentUser?.tournamentRef.id,
          },
          gameResult: {
            playerAScore: currentUserScore,
            playerBScore: opponentScore,
            winnerId:
              currentUserScore > opponentScore
                ? currentUser?.id
                : currentOpponent?.id,
          },
        },
      });
      clearOpponent();
      navigate(paths.root);
    }
  };

  const _onCurrentUserScoreChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setCurrentUserScore(Number.parseInt(e.target.value, 10));
  };

  const _onOpponentScoreChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setOpponentScore(Number.parseInt(e.target.value, 10));
  };

  return (
    <ProtectedRoute>
      <>
        <NavigationBar />
        <div className="flex justify-center items-center">
          {currentOpponent != null ? (
            <>
              <div className="max-w-md mt-10">
                <h3 className="text-xl font-bold">Game results</h3>
                <div>
                  <label className="label">
                    <span className="label-text">
                      {currentUser?.name}&apos;s Score
                    </span>
                  </label>
                  <label className="input-group">
                    <span>Score</span>
                    <input
                      type="text"
                      placeholder="11"
                      className="input input-bordered"
                      onChange={(e) => {
                        _onCurrentUserScoreChange(e);
                      }}
                    />
                  </label>
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">
                      {currentOpponent.name}&apos; Score
                    </span>
                  </label>
                  <label className="input-group">
                    <span>Score</span>
                    <input
                      type="text"
                      placeholder="8"
                      className="input input-bordered"
                      onChange={(e) => {
                        _onOpponentScoreChange(e);
                      }}
                    />
                  </label>
                </div>
                <button
                  className="btn btn-success mt-4"
                  onClick={_onCreateGameClick}
                >
                  Create Game
                </button>
              </div>
            </>
          ) : (
            <div>
              <SearchOpponentByName
                value={opponentSearchedValue}
                onChange={setOpponentSearchedValue}
              />
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <PlayersSearchList playersList={playersList} />
              )}
            </div>
          )}
        </div>

        <Steps currentOpponent={currentOpponent} isSuccess={isSuccess} />
      </>
    </ProtectedRoute>
  );
}
