import { create } from "zustand";
import { INotif } from "./types";

interface NotifStore {
  notifs: INotif[];
  subscriptionNotifs: INotif[];
  selectNotif: INotif | undefined;
  selectEditNotif: INotif | undefined;
  addNotif: (notif: INotif) => void;
  setFetchNotifs: (fetchNotif: INotif[]) => void;
  setSubscriptionNotifs: (subscriptionNotifs: INotif[]) => void;
  setSelectNotif: (selectNotif: INotif) => void;
  setSelectEditNotif: (selectEditNotif: INotif) => void;
}

export const useNotifStore = create<NotifStore>((set) => ({
  notifs: [],
  subscriptionNotifs: [],
  selectNotif: undefined,
  selectEditNotif: undefined,
  addNotif: (notif) => set((state) => ({ notifs: [...state.notifs, notif] })),
  setFetchNotifs: (fetchNotifs) => set({ notifs: fetchNotifs }),
  setSubscriptionNotifs: (newSubscriptionNotifs) => set({ subscriptionNotifs: newSubscriptionNotifs }),
  setSelectNotif: (newSelectNotif) => set({ selectNotif: newSelectNotif }),
  setSelectEditNotif: (newSelectEditNotif) => set({ selectEditNotif: newSelectEditNotif }),
}));
