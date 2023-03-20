import { type IPlayer } from "../api/player/get/types";
import { useOpponentStore, useUserStore } from "../store";

export const PlayersSearchList = ({
  playersList,
}: {
  playersList: IPlayer[] | undefined;
}): JSX.Element => {
  const { getUser } = useUserStore();
  const currentUser = getUser();
  const { setOpponent } = useOpponentStore();
  const _onOpponentSelect = (player: IPlayer): void => {
    setOpponent(player);
  };

  return (
    <ul className="card bg-base-100 shadow-xl mt-2 max-h-96 overflow-auto">
      {playersList != null && playersList.length !== 0 ? (
        <>
          {playersList
            .filter((player) => player.id !== currentUser?.id)
            .map((player) => {
              return (
                <li key={player.id} className="m-2">
                  <button
                    className="w-full transition-all duration-200 hover:bg-darkGrey"
                    onClick={() => {
                      _onOpponentSelect(player);
                    }}
                  >
                    {player.name}
                  </button>
                </li>
              );
            })}
        </>
      ) : (
        <>not found</>
      )}
    </ul>
  );
};
