import React from "react";
import { Tag } from "../ui";
import { Flex } from "../../../shared/ui";
import { ITag, useTagStore } from "../model";

interface TagListProps {
  initialTags: ITag[];
}

export const TagList: React.FC<TagListProps> = ({ initialTags }) => {
  const { selectedTags, setSelectedTags } = useTagStore();

  const handleTagClick = (id: ITag["id"]) => {
    const tag = initialTags.find((tag) => tag.id === id);
    if (!tag) return;

    const updatedTags = selectedTags.some(
      (selectedTag) => selectedTag.id === id
    )
      ? selectedTags.filter((selectedTag) => selectedTag.id !== id) // Удаляем тег, если он уже выбран
      : [...selectedTags, tag]; // Добавляем тег, если он ещё не выбран

    setSelectedTags(updatedTags);
  };

  return (
    <article>
      <Flex $direction="row" $wrap={true} $align="center">
        {initialTags.length > 0 ? (
          initialTags.map((tag) => {
            const isSelected = selectedTags.some(
              (selectedTag) => selectedTag.id === tag.id
            );

            return (
              <Tag
                key={tag.id}
                id={tag.id}
                name={tag.name}
                style={isSelected ? "choice" : "normal"}
                onClick={() => handleTagClick(tag.id)}
              />
            );
          })
        ) : (
          <p>Тегов нет</p>
        )}
      </Flex>
    </article>
  );
};
