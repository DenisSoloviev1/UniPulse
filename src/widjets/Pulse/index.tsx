import React from "react";
import styles from "./styles.module.scss";
import { Container, Flex, Tag } from "../../components";

interface PulseProps {
  title: string;
  text: string;
  id: string;
  tags: string[];
}

const Pulse: React.FC<PulseProps> = ({ title, text, id, tags }) => {
  return (
    <article className={styles.pulse} id={id}>
      <Container active={false}>
        <h4 className={styles.title}>{title}</h4>
        <p className={styles.text}>{text}</p>
        <Flex className={"row"}>
          {tags.map((tag, index) => (
            <Tag
              key={`${id}-${index}`}
              name={tag}
              id={`${id}-${index}`}
              color={"light"}
              isActive={false}
            />
          ))}
        </Flex>
      </Container>
    </article>
  );
};

export default Pulse;
