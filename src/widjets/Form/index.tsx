import React from "react";
import style from "./style.module.scss";
import Calendar from "../Calendar";
import Container from "../../components/Container";
import Flex from "../../components/Flex";
import MediaItem from "../../components/MediaItem";
import TagList from "../tagList";
import CustomButton from "../../components/CustomButton";
import { ArrowSvg } from "../../assets/svg";

const Form: React.FC = () => {
  return (
    <form action="" className={style.form}>
      <Flex title={"Уведомление"}>
        <Container className={"br16"}>
          <textarea
            className={style.textarea}
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
