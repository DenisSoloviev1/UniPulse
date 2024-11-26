import { create } from "zustand";
import { ISubscription } from "./types";

interface SubscriptionStore {
  subscriptions: ISubscription["tag"][];
  setSubscriptions: (subscriptions: ISubscription["tag"][]) => void;
}

export const useSubscriptionStore = create<SubscriptionStore>((set) => ({
  subscriptions: [],
  setSubscriptions: (newSubscriptions) => set({ subscriptions: newSubscriptions }),
}));
