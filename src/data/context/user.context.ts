import { create } from "zustand";

type UserState = {
  name: string | null;
  photo: string | null;
  setName: (name: string) => void;
  setPhoto: (photo: string) => void;
  resetUser: () => void;
  logout: () => void;
};

export const useUserStore = create<UserState>((set) => {
  const storedName = localStorage.getItem("userName");
  const storedPhoto = localStorage.getItem("userPhoto");

  return {
    name: storedName || null,
    photo: storedPhoto || null,
    setName: (name) => {
      set({ name });
      localStorage.setItem("userName", name);
    },
    setPhoto: (photo) => {
      set({ photo });
      localStorage.setItem("userPhoto", photo);
    },
    resetUser: () => {
      set({ name: null, photo: null });
      localStorage.removeItem("userName");
      localStorage.removeItem("userPhoto");
    },
    logout: () => {
      set({ name: null, photo: null });
      localStorage.removeItem("userName");
      localStorage.removeItem("userPhoto");
    },
  };
});
