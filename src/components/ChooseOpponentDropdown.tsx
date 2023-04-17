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
        <div className="top-15 card bg-base-100  absolute left-0 z-10 flex max-h-72 w-40 flex-col overflow-auto rounded py-1 px-2 shadow-xl ">
          {playersList
            ?.filter((player) => player.id !== currentUser?.id)
            .map((player) => {
              return (
                <a
                  className="btn bg-base-300 hover:bg-lightGrey font-ubuntuRegular hover:border-navy dark:bg-base-600 my-1 border-2 border-none p-0 dark:hover:text-black"
                  key={player.name}
                  onClick={() => {
                    _onOpponentSelect(player);
                  }}
                >
                  {player.name}
                </a>
              );
            })}
        </div>
      )}
    </div>
  );
};
