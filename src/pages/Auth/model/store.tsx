import { create } from "zustand";
import { Roles, RolesDict } from "../../../shared/types";

interface IAuthState {
  isAuth: boolean;
  role: Roles; // Тип роли основывается на RolesDict
  setRole: (newRole: Roles) => void; // Используем тип Roles для функции
}

export const useAuthStore = create<IAuthState>((set) => ({
  isAuth: false,
  // role: '' as Roles,
  role: RolesDict.ADMIN,
  setRole: (newRole: Roles) => set({ isAuth: true, role: newRole }),
}));
