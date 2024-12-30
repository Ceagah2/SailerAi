import { create } from "zustand";

type UserState = {
  name: string | null;
  photo: string | null;
  setName: (name: string) => void;
  setPhoto: (photo: string) => void;
  resetUser: () => void;
};

export const useUserStore = create<UserState>((set) => ({
  name: null,
  photo: null,
  setName: (name) => set({ name }),
  setPhoto: (photo) => set({ photo }),
  resetUser: () => set({ name: null, photo: null }),
}));
