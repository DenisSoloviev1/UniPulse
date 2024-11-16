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
