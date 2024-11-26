import React from "react";
import { Flex } from "../../../shared/ui";
import { Tag } from "../ui";
import { ITag, useTagStore } from "../model";

interface TagListProps {
  initialTags: ITag[];
}

export const TagList: React.FC<TagListProps> = ({ initialTags = [] }) => {
  const { selectedTags, setSelectedTags } = useTagStore();

  // Функция для выбора/снятия тега
  const toggleTagSelect = (id: ITag["id"]) => {
    const tag = initialTags.find((tag) => tag.id === id);
    if (!tag) return;

    setSelectedTags(
      selectedTags.some((selectedTag) => selectedTag.id === id)
        ? selectedTags.filter((selectedTag) => selectedTag.id !== id)
        : [...selectedTags, tag]
    );
    console.log(`выбранный тэг ${tag}`)
  };
  return (
    <article>
      <Flex $direction={"row"} $wrap={true} $align={"center"}>
        {initialTags.length !== 0 ? (
          initialTags.map((tag) => (
            <Tag
              key={tag.id}
              id={tag.id}
              name={tag.name}
              onClick={() => toggleTagSelect(tag.id)}
            />
          ))
        ) : (
          <p>тегов нет</p>
        )}
      </Flex>
    </article>
  );
};
