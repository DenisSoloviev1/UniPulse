import React, { useState } from "react";
import { Time, INotif, submitNotif } from "../../../entities/notification";
import { Tag } from "../../../entities/tag";
import { formatDate } from "../../../shared/config";
import { CustomButton, Flex, Loader, ShowFile } from "../../../shared/ui";
import { Error, TextMore, Title } from "../style.ts";
import { Arrow } from "../../../shared/ui/Icon/index.tsx";

interface SubmitNotifProps {
  notifData: INotif;
}

export const SubmitNotif: React.FC<SubmitNotifProps> = ({ notifData }) => {
  // if (!notifData) return <p>Данных нет</p> // опять поймали

  // const openModal = useModalStore((state) => state.open);
  // const closeModal = useModalStore((state) => state.close);
  // const isComplited = useModalStore((state) => state.isOpen("Complited"));

  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const formattedDate = formatDate(notifData.time);

  // Обработчик отправки формы
  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      if (notifData) {
        await submitNotif(notifData.id);
      } else {
        setError("Ошибка подтверждения");
      }

      // Успешное завершение
      setError("");
      // openModal("Complited");
      setIsLoading(false);

      // Убираем модалку через несколько секунд
      setTimeout(() => {
        // closeModal("Complited");
      }, 3000);
    } catch (error) {
      console.error("Ошибка подтверждения уведомления:", error);
      setError("Не удалось подтвердить");
      // closeModal("Complited");
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

        {notifData.files && (
          <ShowFile files={notifData.files} idNotif={notifData.id} />
        )}

        <Flex $direction={"row"} $align={"center"} $wrap>
          {notifData.tags.map((tag) => (
            <Tag key={tag.id} id={tag.id} name={tag.name} style={"noAction"} />
          ))}
        </Flex>

        <CustomButton $style={"blue"} onClick={handleSubmit}>
          Подтвердить
          {isLoading ? <Loader size={"23px"} /> : <Arrow />}
        </CustomButton>

        {error && <Error>{error}</Error>}
      </Flex>

      {/* <ModпппппalWindow show={isComplited} onClick={() => closeModal("Complited")}>
        <ComplitedSvg />
      </ModalWindow> */}
    </>
  );
};
