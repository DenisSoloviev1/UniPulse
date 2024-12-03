import React, { useState } from "react";
import {
  Title,
  Time,
  INotif,
  submitNotif,
} from "../../../entities/notification";
import { Tag } from "../../../entities/tag";
import { formatDate } from "../../../shared/config";
import { CustomButton, Flex, Loader, ModalWindow } from "../../../shared/ui";
import { Error } from "../style.ts";
import { useModalStore } from "../../../shared/ui/ModalWindow/store.ts";
import { TextMore } from "../style";
import { Arrow, ComplitedSvg } from "../../../shared/ui/Icon/index.tsx";

interface SubmitNotifProps {
  notifData: INotif;
}

export const SubmitNotif: React.FC<SubmitNotifProps> = ({ notifData }) => {
  if (!notifData) return <p>Данных нет</p>;

  const openModal = useModalStore((state) => state.open);
  const closeModal = useModalStore((state) => state.close);
  const isComplited = useModalStore((state) => state.isOpen("Complited"));

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formattedDate = formatDate(notifData.time);

  // Обработчик отправки формы
  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      if (notifData) {
        await submitNotif(notifData.id);
      } else {
        setError("Ошибка подтверждения уведомления");
      }

      // Успешное завершение
      setError(null);
      openModal("Complited");
      setIsLoading(false);

      // Убираем модалку через несколько секунд
      setTimeout(() => {
        closeModal("Complited");
      }, 3000);
    } catch (error) {
      console.error("Ошибка подтверждения уведомления:", error);
      setError("Не удалось подтвердить уведомление");
      closeModal("Complited");
    }
  };

  return (
    <>
      <Flex $width={"100%"} $gap={10}>
        <Flex
          $width={"100%"}
          $direction={"row"}
          $justify={"flex-end"}
          $gap={15}
        >
          <Time>{formattedDate}</Time>
        </Flex>

        <Title>{notifData.title}</Title>

        <TextMore>{notifData.description}</TextMore>

        <Flex $direction={"row"} $align={"center"} $wrap>
          {notifData.tags.map((tag) => (
            <Tag key={tag.id} id={tag.id} name={tag.name} style={"noActive"} />
          ))}
        </Flex>

        <CustomButton $style={"blue"} onClick={handleSubmit}>
          Подтвердить
          {isLoading ? <Loader /> : <Arrow />}
        </CustomButton>
        
        {error && <Error>{error}</Error>}{" "}
      </Flex>

      <ModalWindow show={isComplited} onClick={() => closeModal("Complited")}>
        <ComplitedSvg />
      </ModalWindow>
    </>
  );
};
