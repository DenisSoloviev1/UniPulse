import React from "react";
import { Title, Text } from "./style";
import { Container, Flex } from "../../../shared/ui";
import { Tag } from "../../tag";
import { INotif } from "../model";

export const Pulse: React.FC<INotif> = ({ title, text, id, tags }) => {
  return (
    <Container $active={false} $width={"100%"}>
      <Flex $gap={15}>
        <Title>{title}</Title>
        <Text>{text}</Text>
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
