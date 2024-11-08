import React from "react";
import styles from "./styles.module.scss";
import Calendar from "../Calendar";
import { Container, Flex, CustomButton, MediaItem } from "../../shared/ui";
import { useAddTagStore } from "../../shared/ui/ModalWindow/store";
import { TagList } from "../../entities/tags";
import { ArrowSvg } from "../../shared/ui/Icon";

const Form: React.FC = () => {
  const closeModal = useAddTagStore((state) => state.close);

  return (
    <form action="" className={styles.form}>
      <Flex title={"Уведомление"}>
        <Container className={"br16"}>
          <textarea
            className={styles.textarea}
            placeholder="Введите текст"
            rows={10}
          ></textarea>
        </Container>
      </Flex>

      <Flex title={"Прикрепленные медиа"}>
        <Flex className={"row"}>
          <MediaItem />
        </Flex>
      </Flex>

      <TagList title={"Получатели"}>
        <Flex title={"Новый тег"}>
          <Container>
            <input type="text" placeholder="Название тега" />
          </Container>
          <Container>
            <input type="text" placeholder="Контингент" />
          </Container>
          <CustomButton onClick={closeModal} className={"blue"}>
            Создать
          </CustomButton>
        </Flex>
      </TagList>

      <Flex className={"row"} title={"Дата отправки"}>
        <Container className={"br16"}>
          <Flex className={"row"}>
            <Calendar />
          </Flex>
        </Container>

        <CustomButton type={"submit"} className={"gray"}>
          Отправить <ArrowSvg />
        </CustomButton>
      </Flex>
    </form>
  );
};
export default Form;
