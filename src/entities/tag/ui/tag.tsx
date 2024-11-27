import React from "react";
import { Container } from "../../../shared/ui";
import { ITag } from "../model";

interface PropsTag {
  id: ITag["id"];
  name: ITag["name"];
  color?: "normal" | "light" | "choice";
  onClick?: () => void;
}

export const Tag: React.FC<PropsTag> = ({
  id,
  name,
  color,
  onClick,
}) => {
  return (
    <Container
      $style={color}
      $border={16}
      $padding={[10, 15]}
      onClick={onClick}
    >
      <p id={`${id}`}>{name}</p>
    </Container>
  );
};
