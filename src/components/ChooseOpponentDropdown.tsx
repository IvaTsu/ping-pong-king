import { useEffect, useRef, useState } from "react";

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

  console.log();

  return (
    <div ref={ref}>
      <div className="flex">
        <p>
          <a
            className="transition-all text-navy duration-200 hover:text-brightNavy cursor-pointer"
            onClick={toggleDropdown}
          >
            {userName}
          </a>
          &apos;s Score
        </p>
      </div>
      {isShown && (
        <div className="absolute card w-40 flex flex-col top-15 left-0 z-10 bg-base-100 shadow-xl rounded py-1 px-2 max-h-72 overflow-auto">
          {playersList
            ?.filter((player) => player.id !== currentUser?.id)
            .map((player) => {
              return (
                <div
                  className="p-0 btn border-none dark:bg-base-600 bg-base-300 hover:bg-lightGrey font-ubuntuRegular my-1 text-cloudBirst dark:text-white borde-2 hover:border-navy"
                  key={player.name}
                  onClick={() => {
                    _onOpponentSelect(player);
                  }}
                >
                  {player.name}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};
