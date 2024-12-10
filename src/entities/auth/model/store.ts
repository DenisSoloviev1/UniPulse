import { create } from "zustand";
import { Roles } from "../../../shared/types";

interface IAuthState {
  isAuth: boolean;
  role: Roles;
  setRole: (newRole: Roles) => void;
  setAuthStatus: (authStatus: boolean) => void;
  setUserId: (id: string) => void;
  resetAuth: () => void;
  userId: string | "";
}

export const useAuthStore = create<IAuthState>((set) => ({
  isAuth: false,
  role: "" as Roles,
  userId: "",
  setAuthStatus: (authStatus: boolean) => set({ isAuth: authStatus }),
  setRole: (newRole: Roles) => set({ role: newRole }),
  setUserId: (id: string) => set({ userId: id }),
  resetAuth: () =>
    set({
      isAuth: false,
      role: "" as Roles,
      userId: "",
    }),
}));
