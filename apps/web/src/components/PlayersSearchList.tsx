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
        <ul className="card mt-2 max-h-96 overflow-auto bg-base-100 shadow-xl">
          {playersList
            .filter((player) => player.id !== currentUser?.id)
            .map((player) => (
              <li key={player.id} className="m-2">
                <a
                  className="btn btn-outline w-full border-2 border-darkGrey font-ubuntuRegular text-black hover:border-navy hover:bg-lightGrey hover:text-black dark:text-white dark:hover:bg-cloud dark:hover:text-white"
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
