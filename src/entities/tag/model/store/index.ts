import { create } from "zustand";
import { ITag } from "../types";


interface TagStore {
  tags: ITag[];
  selectedTags: ITag[];
  subscriptionTags: ITag[];
  addTag: (tag: ITag) => void;
  setTags: (tags: ITag[]) => void;
  setSelectedTags: (selectedTags: ITag[]) => void;
  setSubscriptionTags: (subscriptionTags: ITag[]) => void;
}



export const useTagStore = create<TagStore>((set) => ({
  tags: [],
  selectedTags: [],
  subscriptionTags: [],
  addTag: (tag) => set((state) => ({ tags: [...state.tags, tag] })),
  setTags: (tags) => set({ tags: tags }),
  setSelectedTags: (selectedTags) => set({ selectedTags }),
  setSubscriptionTags: (subscriptionTags) => set({ subscriptionTags }),
}));


