import React from "react";
import { Container } from "../../../shared/ui";
import { ITag } from "../model";

interface PropsTag {
  id: ITag["id"];
  name: ITag["name"];
  style?: "normal" | "light" | "choice";
  onClick?: () => void;
}

export const Tag: React.FC<PropsTag> = ({
  id,
  name,
  style,
  onClick,
}) => {
  return (
    <Container
      $style={style}
      $border={16}
      $padding={[10, 15]}
      onClick={onClick}
    >
      <p id={`${id}`}>{name}</p>
    </Container>
  );
};
