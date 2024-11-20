import { create } from "zustand";

interface helperState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useHelperStore = create<helperState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));