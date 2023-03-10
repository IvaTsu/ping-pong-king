import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { type IPlayer } from "./api/player/get/types";

interface IUserState {
  user: IPlayer | undefined;
}

interface IUserStateActions {
  clear: () => void;
  setUser: (user: IPlayer | undefined) => void;
  getUser: () => IPlayer | undefined;
}

export const useUserStore = create<IUserState & IUserStateActions>()(
  persist(
    (set, get) => ({
      user: undefined,
      clear: () => {
        set({
          user: undefined,
        });
      },
      setUser: (user) => {
        set({
          user,
        });
      },
      getUser: () => get().user,
    }),
    {
      name: "user-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage),
    }
  )
);

interface IOpponentState {
  opponent: IPlayer | undefined;
}

interface IOpponentStateActions {
  clear: () => void;
  setOpponent: (user: IPlayer | undefined) => void;
  getOpponent: () => IPlayer | undefined;
}

export const useOpponentStore = create<
  IOpponentState & IOpponentStateActions
>()(
  persist(
    (set, get) => ({
      opponent: undefined,
      clear: () => {
        set({
          opponent: undefined,
        });
      },
      setOpponent: (opponent) => {
        set({
          opponent,
        });
      },
      getOpponent: () => get().opponent,
    }),
    {
      name: "opponent-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage),
    }
  )
);
