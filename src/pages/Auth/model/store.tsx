import { create } from 'zustand';
import { Roles } from '../../../shared/types';

interface IAuthState {
  isAuth: boolean;
  role: Roles | string;
  login: (roleName: Roles) => void;
}

export const useAuthStore = create<IAuthState>((set) => ({
  isAuth: false,
  role: '' as Roles,
  login: (roleName: Roles) => {
    set({ isAuth: true, role: roleName });
  },
}));