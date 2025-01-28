import { create } from "zustand";
import { Roles } from "../../../shared/types";
import { getRole, IUser } from "../../user";
import { getUser } from "../../user";

interface IAuthState {
  isAuth: boolean;
  role: Roles;
  user: IUser;
  userId: string;
  setUser: (user?: IUser) => void;
  setRole: (role?: Roles) => void;
  setUserId: (id: string) => void;
  resetAuth: () => void;
}

export const useAuthStore = create<IAuthState>((set) => ({
  isAuth: false,
  role: "" as Roles,
  user: {} as IUser,
  userId: "",
  
  setUser: async (user) => {
    if (user) {
      set({ user: user });
    } else {
      const user_info = await getUser();
      set({ user: user_info });
    }
  },
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
