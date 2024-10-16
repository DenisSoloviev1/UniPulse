import React from "react";
import styles from "./styles.module.scss";
import Calendar from "../Calendar";
import { Container, Flex, CustomButton, MediaItem } from "../../components";
import TagList from "../tagList";
import { ArrowSvg } from "../../assets/svg";

const Form: React.FC = () => {
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

      <TagList title={"Получатели"} />

      <Flex className={"row"} title={"Дата отправки"}>
        <Container className={"br16"}>
          <Flex className={"row"}>
            <Calendar />
          </Flex>
        </Container>

        <CustomButton type={"submit"}>
          Отправить сейчас <ArrowSvg />
        </CustomButton>
      </Flex>
    </form>
  );
};
export default Form;
