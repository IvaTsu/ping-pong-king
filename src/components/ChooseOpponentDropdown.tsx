import { useRef, useState } from "react";

import { type IPlayer } from "../api/player/get/types";
import useClickOutside from "../hooks/useClickOutside";
import { useOpponentStore, useUserStore } from "../store";

export const ChooseOpponentsDropdown = ({
  playersList,
  userName,
}: {
  playersList: IPlayer[] | undefined;
  userName: string;
}): JSX.Element => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isShown, setIsShown] = useState<boolean>(false);
  const toggleDropdown = (): void => {
    setIsShown(!isShown);
  };

  useClickOutside(ref, setIsShown);
  const { setOpponent } = useOpponentStore();
  const { getUser } = useUserStore();
  const currentUser = getUser();
  const _onOpponentSelect = (player: IPlayer): void => {
    setOpponent(player);
    setIsShown(!isShown);
  };

  return (
    <div ref={ref}>
      <p>
        <a
          className="text-navy hover:text-brightNavy cursor-pointer transition-all duration-200"
          onClick={toggleDropdown}
        >
          {userName}
        </a>
        &apos;s Score
      </p>
      {isShown && (
        <ul className="card bg-base-100 top-15 absolute left-0 z-10 mt-2 max-h-96 overflow-auto shadow-xl">
          {playersList
            ?.filter((player) => player.id !== currentUser?.id)
            .map((player) => {
              return (
                <li key={player.id} className="m-2">
                  <a
                    className="btn btn-outline font-ubuntuRegular hover:bg-lightGrey hover:border-navy dark:hover:bg-cloud w-full border-2 text-black transition-all duration-200 dark:text-white border-darkGrey"
                    onClick={() => {
                      _onOpponentSelect(player);
                    }}
                  >
                    {player.name}
                  </a>
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
};
