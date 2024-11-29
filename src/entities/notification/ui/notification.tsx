import React from "react";
import { Title, Text, Time, Status } from "./style";
import { Container, Flex } from "../../../shared/ui";
import { Tag } from "../../tag";
import { INotif, StatusNotif, useNotifStore } from "../model";
import { formatDate, isMobile } from "../../../shared/config";
import { useModalStore } from "../../../shared/ui/ModalWindow/store";

export const Notif: React.FC<INotif> = ({
  id,
  title,
  description,
  time,
  tags,
  status,
  files,
}) => {
  const { setSelectNotif } = useNotifStore();
  const openModal = useModalStore((state) => state.open);
  const closeModal = useModalStore((state) => state.close);

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
    <>
      <Container
        $width={"100%"}
        onClick={() => {
          triggerNotif(); // Устанавливаем уведомление
          openModal(`Notif-${id}`);
          closeModal("Push")
        }}
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

              <Status $status={status}>{StatusNotif[status]}</Status>
            </Flex>
          </Flex>

          <Text>{description}</Text>
          <Flex $direction={"row"}>
            {Array.isArray(tags) &&
              tags
                .filter((tag) => tag && typeof tag === "object" && "id" in tag) // Проверяем корректность тегов
                .map((tag) => (
                  <Tag
                    key={tag.id}
                    id={tag.id}
                    name={tag.name}
                    style={"light"}
                  />
                ))}
          </Flex>
        </Flex>
      </Container>
    </>
  );
};
