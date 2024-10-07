import React from "react";
import style from "./style.module.scss";
import Container from "../../components/Container";
import Flex from "../../components/Flex";
import Tag from "../../components/Tag";

interface PulseItemProps {
  title: string;
  text: string;
  id: string;
}

const PulseItem: React.FC<PulseItemProps> = ({ title, text, id }) => {
  return (
    <article className={style.pulseItem} id={id}>
      <Container active={false}>
        <h4 className={style.title}>{title}</h4>
        <p className={style.text}>{text}</p>
        <Flex className={"row"}>
          <Tag id={"1"} text={"студенты"} color={"light"} />
          <Tag id={"2"} text={"преподаватели"} color={"light"} />
          <Tag id={"3"} text={"работники"} color={"light"} />
        </Flex>
      </Container>
    </article>
  );
};

export default PulseItem;
