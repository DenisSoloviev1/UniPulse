import { create } from "zustand";
import { ITag } from "./types";

interface TagStore {
  tag: ITag | null;
  tags: ITag[];
  subscriptionToTags: ITag[];
  selectedTags: ITag[];
  selectedEditTags: ITag[];
  addTag: (tag: ITag) => void;
  setTags: (tags: ITag[]) => void;
  setSubscriptionToTags: (subscriptionToTags: ITag[]) => void;
  setSelectedTags: (selectedTags: ITag[]) => void;
  setSelectedEditTags: (selectedEditTags: ITag[]) => void;
}

export const useTagStore = create<TagStore>((set) => ({
  tag: null,
  tags: [],
  subscriptionToTags: [],
  selectedTags: [],
  selectedEditTags: [],
  addTag: (newTag) => set({ tag: newTag }),
  setTags: (newTags) => set({ tags: newTags }),
  setSubscriptionToTags: (newSubscriptionToTags) => set({ subscriptionToTags: newSubscriptionToTags }),
  setSelectedTags: (newSelectedTags) => set({ selectedTags: newSelectedTags }),
  setSelectedEditTags: (newSelectedEditTags) => set({ selectedEditTags: newSelectedEditTags }),
}));
