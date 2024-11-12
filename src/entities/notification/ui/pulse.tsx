import React, { useState } from "react";
import { Notif, Title, Text, Toggle } from "./style";
import { Container, Flex } from "../../../shared/ui";
import { Tag } from "../../tag";
import { Back } from "../../../shared/ui/Icon";

interface PulseProps {
  title: string;
  text: string;
  id: number;
  tags: string[];
}

const Pulse: React.FC<PulseProps> = ({ title, text, id, tags }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleText = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <Container $active={false} $width={"100%"}>
      <Notif>
        <Title>{title}</Title>
        <Text>
          {isExpanded ? text : `${text.slice(0, 100)}`}
          {!isExpanded && text.length > 100 && (
            <Toggle onClick={toggleText}>...</Toggle>
          )}
          {isExpanded && (
            <Toggle onClick={toggleText}>
              <Back />
            </Toggle>
          )}
        </Text>
        <Flex $direction={"row"}>
          {tags.map((tag, index) => (
            <Tag
              key={`${id}-${index}`}
              name={tag}
              id={id - index}
              color={"light"}
              isActive={false}
            />
          ))}
        </Flex>
      </Notif>
    </Container>
  );
};

export default Pulse;
