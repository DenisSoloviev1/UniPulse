import React from "react";
import style from "./style.module.scss";
import Calendar from "../Calendar";
import Container from "../../components/Container";
import Flex from "../../components/Flex";
import MediaItem from "../../components/MediaItem";
import Tag from "../../components/Tag";
import { ArrowSvg, CalendarSvg } from "../../assets/svg";

const Form: React.FC = () => {
  return (
    <form action="" className={style.form}>
      <Flex title={"Уведомление"}>
        <Container className={"br16"} clickId={"text"}>
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

      <Flex title={"Получатели"}>
        <Flex className={"row"}>
          <Tag id={"1"} text={"Все преподаватели"} />
          <Tag id={"2"} text={"Студенты"} />
          <Tag id={"3"} text={"Студенты МКиМТ"} />
          <Tag id={"4"} text={"Студенты МКиМТ"} />
          <Tag id={"5"} text={"Студенты МКиМТ"} />
          <Tag id={"6"} text={"Студенты МКиМТ"} />
          <Tag id={"7"} text={"Студенты МКиМТ"} />
          <Tag id={"8"} text={"Студенты МКиМТ"} />
          <Tag id={"9"} text={"Студенты МКиМТ"} />
        </Flex>
      </Flex>

      <Flex className={"row"} title={"Дата отправки"}>
        <Container>
          <Flex className={"row"}>
            <Calendar />
            <CalendarSvg />
          </Flex>
        </Container>

        <Container clickId={"button"}>
          <Flex className={"row"}>
            <button type="submit" id="button">
              Отправить сейчас
            </button>
            <ArrowSvg />
          </Flex>
        </Container>
      </Flex>
    </form>
  );
};
export default Form;