import React from "react";
import { Title, Text } from "./style";
import { Container, Flex } from "../../../shared/ui";
import { Tag } from "../../tag";
import { INotif } from "../model";

export const Notif: React.FC<INotif> = ({ title, description, tags }) => {
  return (
    <Container $active={false} $width={"100%"}>
      <Flex $gap={15}>
        <Title>{title}</Title>
        <Text>{description}</Text>
        <Flex $direction={"row"}>
            {tags[0] !== null ?

                (tags.map((tag) => (
                <Tag
                key={tag.id}
            id={tag.id}
            name={tag.name}
            color={"light"}
            isActive={false}
        />
          ))): null}
        </Flex>
      </Flex>
    </Container>
  );
};
