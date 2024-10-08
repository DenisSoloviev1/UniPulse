import React, { useState } from "react";
import Flex from "../components/Flex";
import Tag from "../components/tag";
import AddTag from "./AddTag";
import CustomButton from "../components/CustomButton";
import { arrayTag } from "../assets/date";

interface TagListProps {
  title: string;
}

const PulseList: React.FC<TagListProps> = ({ title }) => {
  const [showAddTag, setShowAddTag] = useState<boolean>(false);
  const handleClick = () => setShowAddTag(!showAddTag);

  return (
    <article>
      <Flex title={title} className={"row"}>
        {arrayTag.map((tag) => (
          <Tag key={tag.id} id={tag.id} name={tag.name} />
        ))}

        <AddTag show={showAddTag} onClick={handleClick} />
        <CustomButton color={"blue"} onClick={handleClick}>
          +
        </CustomButton>
      </Flex>
    </article>
  );
};

export default PulseList;
