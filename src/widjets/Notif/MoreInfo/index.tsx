import React from "react";
import {
  Title,
  Text,
  Time,
  useNotifStore,
} from "../../../entities/notification";
import { Tag } from "../../../entities/tag";
import { formatDate } from "../../../shared/config";
import { Flex } from "../../../shared/ui";

export const MoreInfo: React.FC = () => {
  const { selectNotif } = useNotifStore();

  if (!selectNotif) return <p>Нет данных</p>;

  const formattedDate = formatDate(selectNotif.time);

  return (
    <Flex $width={"100%"} $gap={10}>
      <Flex $width={"100%"} $direction={"row"} $justify={"flex-end"} $gap={15}>
        <Time>{formattedDate}</Time>
      </Flex>

      <Flex $width={"100%"} $align={"center"}>
        <Title>{selectNotif.title}</Title>
      </Flex>

      <Text>{selectNotif.description}</Text>

      <Flex $direction={"row"} $align={"center"} $wrap>
        {selectNotif.tags.map((tag) => (
          <Tag key={tag.id} id={tag.id} name={tag.name} style={"noActive"} />
        ))}
      </Flex>
    </Flex>
  );
};
