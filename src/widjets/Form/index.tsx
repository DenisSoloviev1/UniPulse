import React from "react";
import { Form, Textarea } from "./style.ts";
import {
  Container,
  Flex,
  CustomButton,
  MediaItem,
  PlainTitle,
  ModalWindow,
} from "../../shared/ui";
import Calendar from "../Calendar";
import { useAddTagStore } from "../../shared/ui/ModalWindow/store";
import { TagList } from "../../entities/tag";
import { ArrowSvg } from "../../shared/ui/Icon";

const CreatNotif: React.FC = () => {
  const openModal = useAddTagStore((state) => state.open);
  const closeModal = useAddTagStore((state) => state.close);

  return (
    <Form>
      <Flex>
        <PlainTitle>Уведомление</PlainTitle>
        <Container $border={16} $width={"100%"}>
          <Textarea placeholder="Введите текст" rows={10}></Textarea>
        </Container>
      </Flex>

      <Flex>
        <PlainTitle>Прикрепленные медиа</PlainTitle>
        <MediaItem />
      </Flex>

      <Flex>
        <PlainTitle>Получатели</PlainTitle>

        <Flex $direction={"row"} $align={"center"}>
          <TagList />

          <CustomButton type={"button"} $style={"blue"} onClick={openModal}>
            +
          </CustomButton>

          <ModalWindow>
            <Flex>
              <PlainTitle>Новый тег</PlainTitle>
              <TagList />

              <Container $width={"100%"}>
                <input type="text" placeholder="Название тега" />
              </Container>
              <Container $width={"100%"}>
                <input type="text" placeholder="Контингент" />
              </Container>
              <CustomButton
                type={"button"}
                onClick={closeModal}
                $style={"blue"}
              >
                Создать
              </CustomButton>
            </Flex>
          </ModalWindow>
        </Flex>
      </Flex>

      <Flex>
        <PlainTitle>Дата отправки</PlainTitle>

        <Flex $direction={"row"}>
          <Container $border={16}>
            <Flex $direction={"row"}>
              <Calendar />
            </Flex>
          </Container>

          <CustomButton type={"submit"} $style={"blue"}>
            Отправить <ArrowSvg />
          </CustomButton>
        </Flex>
      </Flex>
    </Form>
  );
};
export default CreatNotif;
