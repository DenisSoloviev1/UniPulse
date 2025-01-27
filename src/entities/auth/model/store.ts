import { create } from "zustand";
import { Roles } from "../../../shared/types";
import { getRole } from "../../user";

interface IAuthState {
  isAuth: boolean;
  role: Roles;
  userId: string;
  setRole: (role?: Roles) => void;
  setUserId: (id: string) => void;
  resetAuth: () => void;
}

export const useAuthStore = create<IAuthState>((set) => ({
  isAuth: false,
  role: "" as Roles,
  userId: "",
  setRole: async (role) => {
    if (role) {
      set({ role: role, isAuth: true });
    } else {
      const response = await getRole();
      set({ role: response, isAuth: true });
    }
  },
  setUserId: (id: string) => set({ userId: id }),
  resetAuth: () => {
    set({
      isAuth: false,
      role: "" as Roles,
      userId: "",
    }),
      localStorage.removeItem("authToken");
  },
}));
