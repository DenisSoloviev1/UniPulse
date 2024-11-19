import React from "react";
import { Flex } from "../../../shared/ui";
import { Tag } from "../ui";
import { ITag, useTagStore } from "../model";

interface TagListProps {
  initialTags?: ITag[];
}

export const TagList: React.FC<TagListProps> = ({ initialTags = [] }) => {
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
  return (
    <article>
      <Flex $direction={"row"} $wrap={true}>
        {initialTags.map((tag) => (
          <Tag
            key={tag.id}
            id={tag.id}
            name={tag.name}
            isActive={true}
            onClick={() => toggleTagSelect(tag.id)}
          />
        ))}
      </Flex>
    </article>
  );
};
