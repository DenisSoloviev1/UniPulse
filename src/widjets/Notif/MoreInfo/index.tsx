import React from "react";
import { Time, INotif } from "../../../entities/notification";
import { Tag } from "../../../entities/tag";
import { formatDate, isMobile } from "../../../shared/config";
import { Flex, ShowFile } from "../../../shared/ui";
import { TextMore, Title } from "../style";

interface MoreInfoProps {
  notifData: INotif;
}

export const MoreInfo: React.FC<MoreInfoProps> = ({ notifData }) => {
  if (!notifData) return <p>Данных нет</p>;

  const formattedDate = formatDate(notifData.time);

  const hrefMatch = notifData.description.match(/<a[^>]+href='([^']+)'/);

  let hrefValue = "";
  if (hrefMatch && hrefMatch[1]) {
    hrefValue = hrefMatch[1];
  }

  const descriptionArr = notifData.description
    .replace(/<a[^>]*>.*?<\/a>/g, "")
    .split("\n");

  return (
    <Flex $width={"100%"} $gap={15}>
      <Flex
        $width={"100%"}
        $direction={isMobile ? "column" : "row-reverse"}
        $align={"end"}
        $justify={"space-between"}
      >
        <Time>{formattedDate}</Time>
      </Flex>

      <Title>{notifData.title}</Title>

      <TextMore>
        {descriptionArr.map((el, i) => (
          <TextMore key={el + "_" + i}>{el}</TextMore>
        ))}
        <TextMore>
          <a href={hrefValue}>Читать полностью</a>
        </TextMore>
      </TextMore>

      {notifData.files && (
        <ShowFile files={notifData.files} idNotif={notifData.id} />
      )}

      <Flex $direction={"row"} $align={"center"} $wrap>
        {notifData.tags.map((tag) => (
          <Tag key={tag.id} id={tag.id} name={tag.name} style={"noAction"} />
        ))}
      </Flex>
    </Flex>
  );
};
