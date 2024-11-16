import { create } from "zustand";
import { ITag } from "..";

interface TagStore {
  tags: ITag[];
  selectedTags: ITag[];
  addTag: (tag: ITag) => void;
  setFetchTags: (fetchTags: ITag[]) => void;
  setSelectedTags: (selectedTags: ITag[]) => void;
  removeTag: (tagId: number) => void;
}

export const useTagStore = create<TagStore>((set) => ({
  tags: [],
  selectedTags: [],
  addTag: (tag) => set((state) => ({ tags: [...state.tags, tag] })),
  setFetchTags: (fetchTags) => set({ tags: fetchTags }), // Эта функция обновляет tags
  setSelectedTags: (selectedTags) => set({ selectedTags }), // Исправлено, обновляет selectedTags
  removeTag: (tagId) =>
    set((state) => ({ tags: state.tags.filter((tag) => tag.id !== tagId) })),
}));
