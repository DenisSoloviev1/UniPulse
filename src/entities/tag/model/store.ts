import {create} from 'zustand';
import { ITag } from "../model"; 

interface TagStore {
  tags: ITag[];
  setTags: (newTags: ITag[]) => void;
  addTag: (tag: ITag) => void;
  removeTag: (tagId: number) => void;
}

export const useTagStore = create<TagStore>((set) => ({
  tags: [], 
  setTags: (newTags) => set({ tags: newTags }),
  addTag: (tag) => set((state) => ({ tags: [...state.tags, tag] })),
  removeTag: (tagId) =>
    set((state) => ({ tags: state.tags.filter((tag) => tag.id !== tagId) })),
}));

