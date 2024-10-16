import React from "react";
import style from "./style.module.scss";
import Container from "../../components/Container";
import Flex from "../../components/Flex";
import Tag from "../../components/tag";

interface PulseProps {
  title: string;
  text: string;
  id: string;
  tags: string[];
}

const Pulse: React.FC<PulseProps> = ({ title, text, id, tags }) => {
  return (
    <article className={style.pulse} id={id}>
      <Container active={false}>
        <h4 className={style.title}>{title}</h4>
        <p className={style.text}>{text}</p>
        <Flex className={"row"}>
          {tags.map((tag, index) => (
            <Tag key={`${id}-${index}`} name={tag} id={`${id}-${index}`} color={"light"} isActive={false} />
          ))}
        </Flex>
      </Container>
    </article>
  );
};

export default Pulse;
