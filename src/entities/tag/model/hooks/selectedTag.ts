import { ITag, useTagStore } from "../../model";

export const useTagSelect = () => {
  const { tags, selectedTags, setSelectedTags } = useTagStore();

  // Функция для выбора/снятия тега
  const toggleTagSelect = (id: ITag["id"]) => {
    const tag = tags.find((tag) => tag.id === id);
    if (!tag) return;

    setSelectedTags(
      selectedTags.some((selectedTag) => selectedTag.id === id)
        ? selectedTags.filter((selectedTag) => selectedTag.id !== id)
        : [...selectedTags, tag]
    );

  };

  return toggleTagSelect;
};
