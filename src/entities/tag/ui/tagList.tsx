import React, { useState, useEffect } from "react";
import { Flex } from "../../../shared/ui";
import { Tag } from "../ui";
import { ITag, useTagStore, useFetchTags } from "../model";
import { Loader } from "../../../shared/ui";

interface TagListProps {
  initialTags?: ITag[];
}

export const TagList: React.FC= () => {
  const { selectedTags } = useTagStore();

  return (
    <article>
      <Flex $direction={"row"} $wrap={true}>
        {selectedTags.map((tag) => (
          <Tag
            key={tag.id}
            id={tag.id}
            name={tag.name}
            isActive={selectedTags.some(
              (selectedTag) => selectedTag.id === tag.id
            )}
          />
        ))}
      </Flex>
    </article>
  );
};
