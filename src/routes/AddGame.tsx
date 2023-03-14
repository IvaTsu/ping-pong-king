import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { createGame } from '../api/game/post/mutations';
import { fetchPlayer } from '../api/player/get/queries';
import { LoadingSpinner } from '../components/LoadingSpinner';
import NavigationBar from '../components/NavigationBar';
import { PlayersSearchList } from '../components/PlayersSearchList';
import { ScoreInput } from '../components/ScoreInput';
import { SearchOpponentByName } from '../components/SearchOpponentByName';
import { Steps } from '../components/Steps';
import SuccessNotification from '../components/SuccessNotification';
import { useAccessToken } from '../hooks/useAccessToken';
import { useDebounce } from '../hooks/useDebounce';
import { paths } from '../router/router';
import { useOpponentStore, useUserStore } from '../store';
import ProtectedRoute from './ProtectedRoute';

export default function AddGame(): JSX.Element {
  const navigate = useNavigate();
  const { accessToken } = useAccessToken();

  const [opponentSearchedValue, setOpponentSearchedValue] = useState('');
  const [currentUserScore, setCurrentUserScore] = useState<number | ''>('');
  const [opponentScore, setOpponentScore] = useState<number | ''>('');
  const [inputError, setInputError] = useState<boolean>(false);

  const debouncedOpponentSearchValue = useDebounce<string>(
    opponentSearchedValue,
    500
  );

  const { mutate: createGameMutation, isSuccess } = useMutation({
    mutationFn: createGame
  });
  const { data: playersList, isLoading } = useQuery(
    ['player', fetchPlayer, accessToken, debouncedOpponentSearchValue],
    async () =>
      await fetchPlayer({
        accessToken: accessToken as string,
        name: debouncedOpponentSearchValue
      })
  );

  useEffect(() => {
    opponentScore === currentUserScore
      ? setInputError(true)
      : setInputError(false);
  }, [currentUserScore, opponentScore]);

  const { getUser } = useUserStore();
  const currentUser = getUser();
  const { getOpponent, clear: clearOpponent } = useOpponentStore();
  const currentOpponent = getOpponent();

  const _onCreateGameClick = (): void => {
    if (
      currentUser?.id != null &&
      currentOpponent?.id != null &&
      accessToken != null &&
      currentUserScore !== '' &&
      opponentScore !== ''
    ) {
      createGameMutation({
        accessToken,
        body: {
          playerRefA: {
            id: currentUser?.id
          },
          playerRefB: {
            id: currentOpponent?.id
          },
          // TODO: this should be a separate selector
          tournamentRef: {
            id: currentUser?.tournamentRef.id
          },
          gameResult: {
            playerAScore: currentUserScore,
            playerBScore: opponentScore,
            winnerId:
              currentUserScore > opponentScore
                ? currentUser?.id
                : currentOpponent?.id
          }
        }
      });

      setCurrentUserScore('');
      setOpponentScore('');
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
          {currentOpponent != null ? (
            <>
              <div className="max-w-lg mt-10">
                <h3 className="text-xl font-bold">Game results</h3>
                <ScoreInput
                  user={currentUser}
                  setUserScore={setCurrentUserScore}
                  value={currentUserScore}
                />
                <ScoreInput
                  user={currentOpponent}
                  setUserScore={setOpponentScore}
                  value={opponentScore}
                />
                <div className="p-10 flex flex-col">
                  <button
                    className="btn btn-success mt-4"
                    onClick={_onCreateGameClick}
                    disabled={inputError}
                  >
                    Create Game
                  </button>

                  <button
                    className="btn btn-success mt-4"
                    onClick={_toOpponents}
                  >
                    To opponents
                  </button>

                  <button className="btn btn-success mt-4" onClick={_getBack}>
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
        </div>

        <Steps currentOpponent={currentOpponent} isSuccess={isSuccess} />
      </>
    </ProtectedRoute>
  );
}
