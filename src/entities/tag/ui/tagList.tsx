import React from "react";
import { Flex } from "../../../shared/ui";
import { Tag } from "../ui";
import { ITag, useTagSelect } from "../model";
import { Loader } from "../../../shared/ui";

interface TagListProps {
  initialTags?: ITag[];
}

export const TagList: React.FC<TagListProps> = ({ initialTags = [] }) => {
  const toggleTagSelect = useTagSelect();

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
