import { create } from "zustand";
import { ISubscription } from "./types";

interface SubscriptionStore {
  subscriptions: ISubscription[];
  setSubscriptions: (subscriptions: ISubscription[]) => void;
}

export const useSubscriptionStore = create<SubscriptionStore>((set) => ({
  subscriptions: [],
  setSubscriptions: (newSubscriptions) =>
    set({ subscriptions: newSubscriptions }),
}));
