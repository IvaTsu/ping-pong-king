import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { createGame } from "../api/game/post/mutations";
import { fetchPlayer } from "../api/player/get/queries";
import { LoadingSpinner } from "../components/LoadingSpinner";
import NavigationBar from "../components/NavigationBar";
import SuccessNotification from "../components/notifications/SuccessNotification";
import { PlayersSearchList } from "../components/PlayersSearchList";
import { ScoreInput } from "../components/ScoreInput";
import { SearchOpponentByName } from "../components/SearchOpponentByName";
import { Steps } from "../components/Steps";
import { thirtyMinutes } from "../constants/time";
import { useDebounce } from "../hooks/useDebounce";
import { paths } from "../router/router";
import { useAuthStore, useOpponentStore, useUserStore } from "../store";
import ProtectedRoute from "./ProtectedRoute";

export default function AddGame(): JSX.Element {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { getAuth } = useAuthStore();
  const auth = getAuth();

  const [inputIsDirty, setInputIsDirty] = useState<boolean>(false);
  const [opponentSearchedValue, setOpponentSearchedValue] = useState("");
  const [currentUserScore, setCurrentUserScore] = useState<number | "">("");
  const [opponentScore, setOpponentScore] = useState<number | "">("");
  const debouncedOpponentSearchValue = useDebounce<string>(
    opponentSearchedValue,
    500
  );

  const { getUser } = useUserStore();
  const currentUser = getUser();
  const { getOpponent, clear: clearOpponent } = useOpponentStore();
  const currentOpponent = getOpponent();

  const {
    mutate: createGameMutation,
    isSuccess,
    reset,
  } = useMutation({
    mutationFn: createGame,
    onSuccess: () => {
      setCurrentUserScore("");
      setOpponentScore("");
      setInputIsDirty(false);
      // invalidate `gamesByUserId` and `player` queries once new game created
      void queryClient.invalidateQueries({
        queryKey: ["playerList"],
      });

      void queryClient.invalidateQueries({
        queryKey: ["player"],
      });

      void queryClient.invalidateQueries({
        queryKey: ["gamesByUserId"],
      });
    },
  });

  useEffect(() => {
    const resetInterval = setTimeout(() => {
      reset();
    }, 3000);
    return () => {
      clearInterval(resetInterval);
    };
  }, [isSuccess]);

  const inputsAreInvalid =
    currentUserScore === opponentScore ||
    typeof currentUserScore === "string" ||
    typeof opponentScore === "string";

  const showErrors = !isSuccess && inputIsDirty && inputsAreInvalid;
  const handleOpponentScore = (value: number | ""): void => {
    setOpponentScore(value);
    setInputIsDirty(true);
  };
  const handleCurrentUserScore = (value: number | ""): void => {
    setCurrentUserScore(value);
    setInputIsDirty(true);
  };

  const { data: playersList, isLoading } = useQuery(
    ["playerByName", auth?.accessToken, debouncedOpponentSearchValue],
    async () =>
      await fetchPlayer({
        accessToken: auth?.accessToken as string,
        name: debouncedOpponentSearchValue,
      }),
    {
      staleTime: thirtyMinutes,
    }
  );

  const _onCreateGameClick = (): void => {
    if (
      currentUser?.id != null &&
      currentOpponent?.id != null &&
      auth?.accessToken != null &&
      currentUserScore !== "" &&
      opponentScore !== ""
    ) {
      createGameMutation({
        accessToken: auth.accessToken,
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
    }
  };

  const _toOpponents = (): void => {
    clearOpponent();
  };
  const _getBack = (): void => {
    clearOpponent();
    navigate(paths.root);
  };

  return (
    <ProtectedRoute>
      <>
        <NavigationBar />
        <div className="flex justify-center items-center flex-col relative">
          <SuccessNotification isOpen={isSuccess} />
          <>
            {currentUser?.registeredWhen != null ? (
              <>
                {currentOpponent != null ? (
                  <>
                    <div className="max-w-lg mt-10">
                      <h3 className="text-xl font-ubuntuRegular ">
                        Game results
                      </h3>
                      <div className="flex flex-col content-center items-center">
                        <ScoreInput
                          user={null}
                          setUserScore={handleCurrentUserScore}
                          value={currentUserScore}
                          isInvalid={showErrors}
                        />
                        <ScoreInput
                          user={currentOpponent}
                          setUserScore={handleOpponentScore}
                          value={opponentScore}
                          isInvalid={showErrors}
                        />

                        {showErrors && (
                          <div className="pt-5 text-rose break-words max-w-[280px] label-text">
                            Wrong input value! Either one of the inputs is
                            empty, or both players have the same score.
                          </div>
                        )}
                      </div>
                      <div className="p-10 flex flex-col">
                        <button
                          className="btn btn-success mt-4 transition-all duration-200 hover:bg-aqua"
                          onClick={_onCreateGameClick}
                          disabled={inputsAreInvalid}
                        >
                          Create Game
                        </button>

                        <button
                          className="btn btn-success mt-4 transition-all duration-200 hover:bg-aqua"
                          onClick={_toOpponents}
                        >
                          To opponents
                        </button>

                        <button
                          className="btn btn-success mt-4 transition-all duration-200 hover:bg-aqua"
                          onClick={_getBack}
                        >
                          To main page
                        </button>
                      </div>
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
                <Steps
                  currentOpponent={currentOpponent}
                  isSuccess={isSuccess}
                />
              </>
            ) : (
              <div className="card w-96 bg-base-100 shadow-xl mt-10">
                <div className="card-body">
                  <h2 className="card-title">
                    Please assign yourself to the office first 🏢
                  </h2>
                  <div className="card-actions justify-center">
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        navigate(paths.profile);
                      }}
                    >
                      Go to Profile
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        </div>
      </>
    </ProtectedRoute>
  );
}
