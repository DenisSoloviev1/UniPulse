import React, { useState } from "react";
import styles from "./styles.module.scss";
import { Container, Flex } from "../../shared/ui";
import {Tag} from "../../entities/tags"
import { Back } from "../../shared/ui/Icon";

interface PulseProps {
  title: string;
  text: string;
  id: string;
  tags: string[];
}

const Pulse: React.FC<PulseProps> = ({ title, text, id, tags }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleText = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <Container active={false}>
      <article className={styles.pulse} id={id}>
        <h4 className={styles.title}>{title}</h4>
        <p className={`${styles.text} ${isExpanded ? styles.expanded : ""}`}>
          {isExpanded ? text : `${text.slice(0, 100)}`}
          {!isExpanded && text.length > 100 && (
            <span className={styles.toggle} onClick={toggleText}>
              ...
            </span>
          )}
          {isExpanded && (
            <span className={styles.toggle} onClick={toggleText}>
              <Back />
            </span>
          )}
        </p>
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
      </article>
    </Container>
  );
};

export default Pulse;
