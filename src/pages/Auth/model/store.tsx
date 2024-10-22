import { create } from "zustand";
import { Roles, RolesDict } from "../../../shared/types";

// interface IAuthState {
//   isAuth: boolean;
//   role: Roles | string;
//   login: (roleName: Roles) => void;
// }

// export const useAuthStore = create<IAuthState>((set) => ({
//   isAuth: false,
//   role: '' as Roles,
//   login: (roleName: Roles) => {
//     set({ isAuth: true, role: roleName });
//   },
// }));

interface IAuthState {
  role: Roles; // Тип роли теперь основывается на RolesDict
  setRole: (newRole: Roles) => void; // Используем тип Roles для функции
}

export const useAuthStore = create<IAuthState>((set) => ({
  role: RolesDict.USER, // Начальное состояние — "user"
  setRole: (newRole: Roles) => set({ role: newRole }),
}));
