import React from "react";
import { Container, CustomButton } from "../../../shared/ui";
import { Close } from "../../../shared/ui/Icon";
import { ITag } from "../model";

interface PropsTag {
  name: ITag["name"];
  id: ITag["id"];
  color?: string;
  isActive?: boolean;
  onClick?: () => void;
}

export const Tag: React.FC<PropsTag> = ({
  name,
  id,
  color,
  isActive = true,
  onClick,
}) => {
  return (
    <Container
      $color={color}
      $border={16}
      $padding={[10, 15]}
      $active={isActive}
      onClick={onClick}
    >
      <p id={`${id}`}>{name}</p>
    </Container>
  );
};
