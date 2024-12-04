import React from "react";
import { Time, INotif} from "../../../entities/notification";
import { Tag } from "../../../entities/tag";
import { formatDate } from "../../../shared/config";
import { Flex } from "../../../shared/ui";
import { TextMore, Title } from "../style";

interface MoreInfoProps {
  notifData: INotif;
}

export const MoreInfo: React.FC<MoreInfoProps> = ({notifData}) => {
  if (!notifData) return <p>Данных нет</p>;

  const formattedDate = formatDate(notifData.time);

  return (
    <Flex $width={"100%"} $gap={10}>
      <Flex $width={"100%"} $direction={"row"} $justify={"flex-end"} $gap={15}>
        <Time>{formattedDate}</Time>
      </Flex>

      <Title>{notifData.title}</Title>

      <TextMore>{notifData.description}</TextMore>

      <Flex $direction={"row"} $align={"center"} $wrap>
        {notifData.tags.map((tag) => (
          <Tag key={tag.id} id={tag.id} name={tag.name} style={"noAction"} />
        ))}
      </Flex>
    </Flex>
  );
};
