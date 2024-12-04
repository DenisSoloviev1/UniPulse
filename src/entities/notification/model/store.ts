import { create } from "zustand";
import { INotif } from "./types";

interface NotifStore {
  notifs: INotif[];
  pushNotifs: INotif[];
  subscriptionNotifs: INotif[];
  creatNotif: (notif: INotif) => void;
  setNotifs: (notifs: INotif[]) => void;
  setPushNotifs: (pushNotifs: INotif[]) => void;
  setSubscriptionNotifs: (subscriptionNotifs: INotif[]) => void; 
}

export const useNotifStore = create<NotifStore>((set) => ({
  notifs: [],
  pushNotifs: [],
  subscriptionNotifs: [],
  creatNotif: (notif) => set((state) => ({ notifs: [...state.notifs, notif] })),
  setNotifs: (newNotifs) => set({ notifs: newNotifs }),
  setPushNotifs: (newPushNotifs) => set({ pushNotifs: newPushNotifs }),
  setSubscriptionNotifs: (newSubscriptionNotifs) => set({ subscriptionNotifs: newSubscriptionNotifs }),
}));
