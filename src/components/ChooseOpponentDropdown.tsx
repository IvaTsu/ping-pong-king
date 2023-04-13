import { useEffect, useRef, useState } from "react";

import { type IPlayer } from "../api/player/get/types";
import { useOpponentStore, useUserStore } from "../store";

export const ChooseOpponentsDropdown = ({
  playersList,
  userName,
}: {
  playersList?: IPlayer[];
  userName: string;
}): JSX.Element => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isShown, setisShown] = useState<boolean>(false);
  const toggleDropdown = (): void => {
    setisShown(!isShown);
  };

  const { setOpponent } = useOpponentStore();
  const { getUser } = useUserStore();
  const currentUser = getUser();
  const _onOpponentSelect = (player: IPlayer): void => {
    setOpponent(player);
    setisShown(!isShown);
  };

  useEffect(() => {
    const checkIfClickedOutside = (e: Event): void => {
      if (
        isShown &&
        ref.current != null &&
        !ref.current.contains(e.target as Node)
      ) {
        setisShown(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isShown]);
  return (
    <>
      <div className="flex">
        <p
          className="transition-all duration-200 hover:text-aqua dark:hover:text-navy cursor-pointer"
          onClick={toggleDropdown}
        >
          {userName}
        </p>
        <p>&apos;s Score</p>
      </div>
      {isShown && (
        <div
          className="absolute w-40 flex flex-col top-15 left-0 z-10 bg-cloudBirst rounded p-2 max-h-72 overflow-auto"
          ref={ref}
        >
          {playersList
            ?.filter((player) => player.id !== currentUser?.id)
            .map((player) => {
              return (
                <div
                  className="p-0 btn btn-ghost font-ubuntuRegular bg-base-100 my-1"
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
    </>
  );
};
