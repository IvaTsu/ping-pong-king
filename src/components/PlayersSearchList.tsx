import { type IPlayer } from "../api/player/get/types";
import { useOpponentStore } from "../store";

export const PlayersSearchList = ({
  playersList,
}: {
  playersList: IPlayer[] | undefined;
}): JSX.Element => {
  const { setOpponent } = useOpponentStore();
  const _onOpponentSelect = (player: IPlayer): void => {
    setOpponent(player);
  };

  return (
    <ul className="card bg-base-100 shadow-xl mt-2 max-h-96 overflow-auto">
      {playersList != null && playersList.length !== 0 ? (
        <>
          {playersList.map((player) => {
            return (
              <li key={player.id} className="m-2">
                <button
                  className="w-full"
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
