import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { type IPlayer } from "./api/player/get/types";

interface IUser {
  isRegistered: boolean;
}

interface IPlayerUser extends IPlayer, IUser {}

interface IUserState {
  user: IPlayerUser | undefined;
}

interface IUserStateActions {
  clear: () => void;
  setUser: (user: IPlayerUser | undefined) => void;
  getUser: () => IPlayerUser | undefined;
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
