import React from "react";
import styles from "./styles.module.scss";
import Calendar from "../Calendar";
import { Container, Flex, CustomButton, MediaItem } from "../../components";
import { useAddTagStore } from "../../components/ModalWindow/store";
import TagList from "../TagList";
import { ArrowSvg } from "../../assets/svg";

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
          Отправить сейчас <ArrowSvg />
        </CustomButton>
      </Flex>
    </form>
  );
};
export default Form;
