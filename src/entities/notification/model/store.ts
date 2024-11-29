import { create } from "zustand";
import { INotif } from "./types";

interface NotifStore {
  notifs: INotif[];
  selectNotif: INotif | null;
  addNotif: (notif: INotif) => void;
  setFetchNotifs: (fetchNotif: INotif[]) => void;
  setSelectNotif: (newSelectNotif: INotif) => void;
}

export const useNotifStore = create<NotifStore>((set) => ({
  notifs: [],
  selectNotif: null,
  addNotif: (notif) => set((state) => ({ notifs: [...state.notifs, notif] })),
  setFetchNotifs: (fetchNotifs) => set({ notifs: fetchNotifs }),
  setSelectNotif: (newSelectNotif) => set({ selectNotif: newSelectNotif }),
}));
