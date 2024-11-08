import styled from "styled-components";
import "../../variables.scss";

export const CustomButton = styled.button<{
  $style?: "gray" | "blue";
  $close?: "small" | "big";
}>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 16px;
  transition: all 0.3s ease-in-out;
  gap: 5px;

  svg {
    width: auto;
    fill: var(--color-background);
    transition: all 0.3s ease-in-out;
  }

  ${(props) =>
    props.$style === "gray" &&
    `
      padding: 10px 15px;
      color: var(--color-font-active);
      background-color: var(--color-background-container);
      border: 2px solid var(--color-background-container);

      &:hover {
        background-color: inherit;
      }
  `}

  ${(props) =>
    props.$style === "blue" &&
    `
      padding: 10px 20px;
      color: var(--color-background);
      border: 2px solid var(--color-action);
      background-color: var(--color-action);

      &:hover {
        background-color: inherit;
        color: var(--color-action);
      }
  `}

  //кнопка закрытия
  ${(props) =>
    props.$close === "small" ? 
  `background-color: transparent;
  border: 0;
  position: absolute;
  top: -5px;
  right: -5px;
  padding: 0;

  svg {
    width: 20px;
    fill: $color-delete;
  }`
  : 
  `background-color: transparent;
  border: 0;
  position: absolute;
  top: -10px;
  right: -10px;
  padding: 0; 

  svg {
    width: 30px;   
    fill: $color-delete;
  }`}
`;
