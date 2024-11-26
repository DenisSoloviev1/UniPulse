import { create } from "zustand";
import { ITag } from "./types";

interface TagStore {
  tags: ITag[];
  subscriptionToTags: ITag[];
  selectedTags: ITag[];
  addTag: (tag: ITag) => void;
  setTags: (tags: ITag[]) => void;
  setSubscriptionToTags: (subscriptionToTags: ITag[]) => void;
  setSelectedTags: (selectedTags: ITag[]) => void;
}

export const useTagStore = create<TagStore>((set) => ({
  tags: [],
  subscriptionToTags: [],
  selectedTags: [],
  addTag: (tag) => set((state) => ({ tags: [...state.tags, tag] })),
  setTags: (newTags) => set({ tags: newTags }),
  setSubscriptionToTags: (newSubscriptionToTags) => set({ subscriptionToTags: newSubscriptionToTags }),
  setSelectedTags: (newSelectedTags) => set({ selectedTags: newSelectedTags }),
}));
