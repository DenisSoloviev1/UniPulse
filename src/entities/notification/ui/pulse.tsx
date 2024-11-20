import React, { useState } from "react";
import { Title, Text, Toggle } from "./style";
import { Container, Flex } from "../../../shared/ui";
import { Tag } from "../../tag";
import { Back } from "../../../shared/ui/Icon";
import { INotif } from "../model";

export const Pulse: React.FC<INotif> = ({ title, text, id, tags }) => {
  // const [isExpanded, setIsExpanded] = useState(false);
  // const toggleText = () => {
  //   setIsExpanded((prev) => !prev);
  // };

  return (
    <Container $active={false} $width={"100%"}>
      <Flex $gap={15}>
        <Title>{title}</Title>
        <Text>
          {/* {isExpanded ? text : `${text.slice(0, 100)}`}
          {!isExpanded && text.length > 100 && (
            <Toggle onClick={toggleText}>...</Toggle>
          )}
          {isExpanded && (
            <Toggle onClick={toggleText}>
              <Back />
            </Toggle>
          )} */}
          {text}
        </Text>
        <Flex $direction={"row"}>
          {tags.map((tag) => (
            <Tag
              key={tag.id}
              id={tag.id}
              name={tag.name}
              color={"light"}
              isActive={false}
            />
          ))}
        </Flex>
      </Flex>
    </Container>
  );
};
