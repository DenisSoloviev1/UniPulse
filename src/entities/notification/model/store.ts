import { create } from "zustand";
import { INotif } from "./types";

interface NotifStore {
  notifs: INotif[];
  addNotif: (tag: INotif) => void;
  setFetchNotifs: (fetchTags: INotif[]) => void;
}

export const useNotifStore = create<NotifStore>((set) => ({
  notifs: [],
  addNotif: (notif) => set((state) => ({ notifs: [...state.notifs, notif] })),
  setFetchNotifs: (fetchNotifs) => set({ notifs: fetchNotifs }),
}));
