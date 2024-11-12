import React from "react";
import { Container, CustomButton } from "../../../shared/ui";
import { Close } from "../../../shared/ui/Icon";

interface PropsTag {
  name: string;
  id: number;
  color?: string;
  isActive?: boolean;
  onClick?: () => void;
  close?: "no" | "small" | "big";
}

export const Tag: React.FC<PropsTag> = ({
  name,
  id,
  color,
  isActive = true,
  onClick,
  close = "no",
}) => {
  return (
    <Container $color={color} $border={16} $padding={[10, 15]} $active={isActive} onClick={onClick}>
      <CustomButton type={"button"} $close={close}
      >
        <Close />
      </CustomButton>
      <p id={`${id}`} style={ { whiteSpace: "nowrap"}}>{name}</p>
    </Container>
  );
};
