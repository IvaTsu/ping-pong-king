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
                <a
                  className="btn btn-outline font-ubuntuRegular hover:bg-lightGrey hover:border-navy dark:hover:bg-cloud w-full border-2 text-black hover:text-black dark:text-white dark:hover:text-white"
                  onClick={() => {
                    _onOpponentSelect(player);
                  }}
                >
                  {player.name}
                </a>
              </li>
            ))}
        </ul>
      ) : (
        <>Nothing found 🤷🏻‍♂️</>
      )}
    </>
  );
};
