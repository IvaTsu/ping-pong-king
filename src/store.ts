import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IUser {
  email: string | undefined;
  family_name: string | undefined;
  given_name: string | undefined;
  name: string | undefined;
  picture: string | undefined;
}

interface IUserState {
  user: IUser | undefined;
}

interface IUserStateActions {
  clear: () => void;
  setUser: (user: IUser) => void;
  getUser: () => IUser | undefined;
}

export const useUserStore = create<IUserState & IUserStateActions>()(
  persist(
    (set, get) => ({
      user: undefined,
      clear: () => {
        set({
          user: {
            email: undefined,
            family_name: undefined,
            given_name: undefined,
            name: undefined,
            picture: undefined,
          },
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
