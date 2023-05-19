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
import { useOpponentStore, useUserStore } from "../store";
import { ReactComponent as BackSVG } from "../svg/back.svg";
import { ReactComponent as CheckSVG } from "../svg/check.svg";
import { ReactComponent as RacketSVG } from "../svg/racket.svg";
import ProtectedRoute from "./ProtectedRoute";

export default function AddGame(): JSX.Element {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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
    ["playerByName", debouncedOpponentSearchValue],
    async () =>
      await fetchPlayer({
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
      currentUserScore !== "" &&
      opponentScore !== ""
    ) {
      createGameMutation({
        body: {
          playerScoreA: {
            playerRef: {
              id: currentUser?.id,
            },
            score: currentUserScore,
          },
          playerScoreB: {
            playerRef: {
              id: currentOpponent?.id,
            },
            score: opponentScore,
          },
          // TODO: this should be a separate selector
          locationRef: {
            id: currentUser?.locationRef.id,
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
        <div className="relative flex flex-col items-center justify-center">
          <SuccessNotification isOpen={isSuccess} />
          <>
            {currentUser?.registeredWhen != null ? (
              <>
                {currentOpponent != null ? (
                  <>
                    <div className="mt-10 max-w-lg">
                      <h3 className="font-ubuntuRegular text-xl">
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
                          playersList={playersList}
                        />

                        {showErrors && (
                          <div className="text-rose label-text max-w-[280px] break-words pt-5">
                            Wrong input value! Either one of the inputs is
                            empty, or both players have the same score.
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col p-10">
                        <button
                          className="btn btn-success hover:bg-aqua mt-4 transition-all duration-200"
                          onClick={_onCreateGameClick}
                          disabled={inputsAreInvalid}
                        >
                          <div className="flex w-full items-center justify-start">
                            <CheckSVG width={25} height={25} />
                            <p className="pl-2">Create game</p>
                          </div>
                        </button>

                        <button
                          className="btn btn-success hover:bg-aqua mt-4 transition-all duration-200"
                          onClick={_toOpponents}
                        >
                          <div className="flex w-full items-center justify-start">
                            <RacketSVG width={25} height={25} />
                            <p className="pl-2">To opponents</p>
                          </div>
                        </button>

                        <button
                          className="btn btn-success hover:bg-aqua mt-4 transition-all duration-200"
                          onClick={_getBack}
                        >
                          <div className="flex w-full items-center justify-start">
                            <BackSVG width={25} height={25} />
                            <p className="pl-2">To main page</p>
                          </div>
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
              <div className="card bg-base-100 mt-10 w-96 shadow-xl">
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
