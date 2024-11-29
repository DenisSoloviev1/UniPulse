import { create } from "zustand";
import { Roles } from "../../../shared/types";

interface IAuthState {
  isAuth: boolean;
  role: Roles | "";
  setRole: (newRole: Roles) => void;
  setAuthStatus: (authStatus: boolean) => void;
  setUserId: (id: string) => void;  // Добавляем метод для обновления id

  resetAuth: () => void;
  userId: string | "";  // Добавляем поле для id
}

const initialAuth = localStorage.getItem("authToken") ? true : false;
const initialRole = (localStorage.getItem("userRole") as Roles) || "";
const initialUserId = localStorage.getItem("userId") || "";


export const useAuthStore = create<IAuthState>((set) => ({
  isAuth: initialAuth,
  role: initialRole,
  userId: initialUserId,  // Инициализируем из localStorage
  setAuthStatus: (authStatus: boolean) => set({ isAuth: authStatus }),
  setRole: (newRole: Roles) => {
    localStorage.setItem("userRole", newRole);
    set({ isAuth: true, role: newRole });
  },
  setUserId: (id: string) => {
    localStorage.setItem("userId", id); // Сохраняем id в localStorage
    set({ userId: id });  // Обновляем состояние
  },
  resetAuth: () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId"); // Удаляем id из localStorage

    set({ isAuth: false, role: "" as Roles, userId: ""});
  },
}));
