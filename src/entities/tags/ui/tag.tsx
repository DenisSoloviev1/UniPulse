import React from "react";
import { Container, CustomButton } from "../../../shared/ui";
import { Close } from "../../../shared/ui/Icon";

interface PropsTag {
  name: string;
  id: string;
  color?: string;
  isActive?: boolean;
  onClick?: () => void;
  close?: boolean;
}

export const Tag: React.FC<PropsTag> = ({
  name,
  id,
  color,
  isActive = true,
  onClick,
  close = false,
}) => {
  return (
    <Container className={`br16 ${color} pdSmall`} active={isActive} onClick={onClick}>
      <CustomButton type={"button"} className={close? "close": "noClose"}
      >
        <Close />
      </CustomButton>
      <p id={id}>{name}</p>
    </Container>
  );
};
