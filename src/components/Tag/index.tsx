import React from "react";
import style from "./style.module.scss";
import Container from "../Container";

interface PropsTag {
  text: string;
  id: string;
  color?: string;
}

const Tag: React.FC<PropsTag> = ({ text, id, color }) => {
  return (
    <Container className={`br16 ${color}`}>
      <span id={id}>{text}</span>
    </Container>
  );
};

export default Tag;
