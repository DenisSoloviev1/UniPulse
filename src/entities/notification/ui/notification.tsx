import React from "react";
import { Title, Text, Time, Status } from "./style";
import { Container, Flex } from "../../../shared/ui";
import { Tag } from "../../tag";
import { INotif, StatusNotif, useNotifStore } from "../model";
import { formatDate, isMobile } from "../../../shared/config";
import { useModalStore } from "../../../shared/ui/ModalWindow/store";
import { Roles } from "../../../shared/types";

type NotifProps = INotif&{
onClick:()=>void;
}

export const Notif: React.FC<NotifProps> = ({
  id,
  title,
  description,
  time,
  tags,
  status,
  files,
  onClick
}) => {
  const { setSelectNotif, setSelectEditNotif } = useNotifStore();
  const openModal = useModalStore((state) => state.open);
  const closeModal = useModalStore((state) => state.close);

  const isAddNotifPath = location.pathname.includes("addNotif");

  // Функция для обработки уведомления
  const triggerNotif = () => {
    const notif: INotif = {
      id,
      title,
      description,
      time,
      tags,
      status,
      files,
    };
    setSelectNotif(notif); // Установка выбранного уведомления
  };

  const formattedDate = formatDate(time);

  return (
    <Container
      $width={"100%"}
      onClick={onClick}
    >
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
            {!isMobile && <Time>{formattedDate}</Time>}

            {/* {isAddNotifPath && (
              <Status $status={status}>
                {StatusNotif[status]}
              </Status>
            )} */}
            <Status $status={status}>
                {StatusNotif[status]}
              </Status>
          </Flex>
        </Flex>

        <Text>{description}</Text>
        <Flex $direction={"row"}>
          {Array.isArray(tags) &&
            tags
              .filter((tag) => tag && typeof tag === "object" && "id" in tag) // Проверяем корректность тегов
              .map((tag) => (
                <Tag key={tag.id} id={tag.id} name={tag.name} style={"light"} />
              ))}
        </Flex>
      </Flex>
    </Container>
  );
};
