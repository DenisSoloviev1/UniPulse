import React from "react";
import { Title, Text, Time, Status } from "./style";
import { Container, Flex } from "../../../shared/ui";
import { Tag } from "../../tag";
import { INotif, StatusNotif } from "../model";
import { formatDate } from "../../../shared/config";

export const Notif: React.FC<INotif> = ({
  title,
  description,
  time,
  tags,
  status,
}) => {
  const formattedDate = formatDate(time);

  return (
    <Container $active={true} $width={"100%"}>
      <Flex $gap={15}>
        <Flex
          $width={"100%"}
          $direction={"row"}
          $align={"center"}
          $justify={"space-between"}
        >
          <Title>{title}</Title>

          <Flex $direction={"row"} $align={"center"} $gap={15}>
            <Time>{formattedDate}</Time>

            <Status $status={status}>{StatusNotif[status]}</Status>
          </Flex>
        </Flex>

        <Text>{description}</Text>
        <Flex $direction={"row"}>
          {tags[0] !== null
            ? tags.map((tag) => (
                <Tag
                  key={tag.id}
                  id={tag.id}
                  name={tag.name}
                  color={"light"}
                  isActive={false}
                />
              ))
            : null}
        </Flex>
      </Flex>
    </Container>
  );
};
