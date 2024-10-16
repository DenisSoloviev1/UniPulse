import React from "react";
import Container from "./Container";
import { Close } from "../assets/svg";

interface PropsTag {
  name: string;
  id: string;
  color?: string;
  isActive?: boolean;
}

const Tag: React.FC<PropsTag> = ({ name, id, color, isActive = true }) => {
  return (
    <Container className={`br16 close ${color}`} active={isActive}>
      <button>
        <Close />
      </button>
      <p id={id}>{name}</p>
    </Container>
  );
};

export default Tag;
