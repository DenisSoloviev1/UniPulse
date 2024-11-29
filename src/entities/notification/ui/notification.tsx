import React from "react";
import { Title, Text, Time, Status } from "./style";
import { Container, Flex } from "../../../shared/ui";
import { Tag } from "../../tag";
import { INotif, StatusNotif } from "../model";
import { formatDate, isMobile } from "../../../shared/config";

export const Notif: React.FC<INotif> = ({
    id,
  title,
  description,
  time,
  tags,
  status,
    active,
    files,
                                          onModalTrigger
}) => {
  const formattedDate = formatDate(time);

  function triggerModal() {
    if (active && onModalTrigger) {
      let notifItem = {
        title: title,
        description: description,
        time: time,
        tags: tags,
        status: status,
        files: files,
        id: id
      }
      onModalTrigger(notifItem); // Вызываем переданную функцию
    }
  }

  return (
    <Container $width={"100%"} onClick={triggerModal}>
      <Flex $gap={15}>
        <Flex
          $width={"100%"}
          $direction={"row"}
          $align={"center"}
          $justify={"space-between"}
          $gap={10}
        >
          <Title>{title}</Title>

          <Flex $direction={"row"} $align={"center"} $gap={15}>
            {isMobile ? <></> : <Time>{formattedDate}</Time>}

            <Status $status={status}>{StatusNotif[status]}</Status>
          </Flex>
        </Flex>

        <Text>{description}</Text>
        <Flex $direction={"row"}>
          {Array.isArray(tags) &&
            tags
              .filter((tag) => tag && typeof tag === "object" && "id" in tag) // Фильтруем корректные объекты
              .map((tag) => (
                <Tag key={tag.id} id={tag.id} name={tag.name} style={"light"} />
              ))}
        </Flex>
      </Flex>
    </Container>
  );
};
