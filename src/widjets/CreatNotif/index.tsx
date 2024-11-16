import React from "react";
import { Form, Textarea } from "./style.ts";
import {
  Container,
  Flex,
  CustomButton,
  MediaItem,
  PlainTitle,
} from "../../shared/ui/index.ts";
import Calendar from "../Calendar/index.tsx";
import { useAddTagStore } from "../../shared/ui/ModalWindow/store.ts";
import { useTagStore } from "../../entities/tag/index.ts";
import { TagList } from "../../entities/tag/index.ts";
import { ArrowSvg } from "../../shared/ui/Icon/index.tsx";
import AddTag from "../AddTag/index.tsx";

const CreatNotif: React.FC = () => {
  const openModal = useAddTagStore((state) => state.open);
  const { selectedTags } = useTagStore();

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

        <Flex>
          <TagList initialTags={selectedTags}/>

          <CustomButton type={"button"} $style={"blue"} onClick={openModal}>
            +
          </CustomButton>

          <AddTag />
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
