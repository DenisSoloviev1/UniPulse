import { create } from "zustand";
import { INotif } from "./types";

interface NotifStore {
  notifs: INotif[];
  subscriptionNotifs: INotif[];
  addNotif: (notif: INotif) => void;
  setFetchNotifs: (fetchNotif: INotif[]) => void;
  setSubscriptionNotifs: (subscriptionNotifs: INotif[]) => void;
 
}

export const useNotifStore = create<NotifStore>((set) => ({
  notifs: [],
  subscriptionNotifs: [],
  addNotif: (notif) => set((state) => ({ notifs: [...state.notifs, notif] })),
  setFetchNotifs: (fetchNotifs) => set({ notifs: fetchNotifs }),
  setSubscriptionNotifs: (newSubscriptionNotifs) => set({ subscriptionNotifs: newSubscriptionNotifs }),
}));
