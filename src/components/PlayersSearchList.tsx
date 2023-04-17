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
    <>
      {playersList != null &&
      playersList.length !== 0 &&
      playersList.filter((player) => player.id !== currentUser?.id).length !==
        0 ? (
        <ul className="card bg-base-100 mt-2 max-h-96 overflow-auto shadow-xl">
          {playersList
            .filter((player) => player.id !== currentUser?.id)
            .map((player) => (
              <li key={player.id} className="m-2">
                <button
                  className="hover:bg-darkGrey w-full transition-all duration-200"
                  onClick={() => {
                    _onOpponentSelect(player);
                  }}
                >
                  {player.name}
                </button>
              </li>
            ))}
        </ul>
      ) : (
        <>Nothing found 🤷🏻‍♂️</>
      )}
    </>
  );
};
