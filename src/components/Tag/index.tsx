import React from "react";
import style from "./style.module.scss";
import Container from "../Container";

interface PropsTag {
  text: string;
  id: string;
}

const Tag: React.FC<PropsTag> = ({ text, id }) => {
  return (
    <Container>
      <span id={id}>{text}</span>
    </Container>
  );
};

export default Tag;
