import React from "react";
import style from "./style.module.scss";
import Calendar from "../Calendar";
import Container from "../../components/Container";
import Flex from "../../components/Flex";
import MediaItem from "../../components/MediaItem";
import Tag from "../../components/Tag";

const Form: React.FC = () => {
  return (
    <form action="" className={style.form}>
      <Flex>
        <label htmlFor="text">Уведомление</label>
        <Container className={"br16"} clickId={"text"}>
          <textarea className={style.textarea} id="text" placeholder="Введите текст" rows={10}></textarea>
        </Container>
      </Flex>

      <Flex>
        <label>Прикрепленные медиа</label>
        <Flex className={"row"}>
          <MediaItem />
        </Flex>
      </Flex>

      <Flex>
        <label>Получатели</label>
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

      <Flex className={"row"}>
        <Container>
          <Calendar />
        </Container>

        <Container clickId={"button"}>
          <button type="submit" id="button">
            Отправить сейчас
          </button>
        </Container>
      </Flex>
    </form>
  );
};
export default Form;
