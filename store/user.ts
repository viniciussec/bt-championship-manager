import create, { SetState } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  name: string;
  email: string;
  type: string;
  gender: string;
  url: string;
};

type State = {
  user: User;
  setUser: (payload: User) => void;
};

export const INITIAL_STATE = {
  name: "",
  email: "",
  type: "",
  gender: "",
  url: "",
};

export const useUserStore = create(
  persist(
    (set: SetState<State>) => ({
      user: INITIAL_STATE,
      setUser: (payload) => {
        set(() => ({ user: payload }));
      },
    }),
    {
      name: "user-storage",
    }
  )
);
