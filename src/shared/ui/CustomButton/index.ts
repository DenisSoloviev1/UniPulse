import styled from "styled-components";
import "../../variables.scss";

export const CustomButton = styled.button<{
  $style?: "gray" | "blue";
  $close?: "no" | "small" | "big";
  $width?: string;
}>`
  ${(props) => (props.$close === "no" ? `display: none;` : `display: flex;`)}
  width: ${(props) => (props.$width ? `${props.$width}` : ``)};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 16px;
  transition: all 0.3s ease-in-out;
  gap: 15px;

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
      padding: 10px 15px;
      color: var(--color-background);
      border: 2px solid var(--color-action);
      background-color: var(--color-action);

      svg {

        fill:  var(--color-background);
        transition: all 0.3s ease-in-out;
      }

      &:hover {
        background-color: inherit;
        color: var(--color-action);

        svg {
        fill: var(--color-action);
      }
      }
  `}

  //кнопка закрытия


  ${(props) =>
    props.$close === "small"
      ? `
          background-color: transparent;
          border: 0;
          position: absolute;
          top: -5px;
          right: -5px;
          padding: 0;
  
          svg {
            width: 20px;
            fill: var(--color-delete);
          }
        `
      : props.$close === "big"
      ? `background-color: transparent;
          border: 0;
          position: absolute;
          top: -10px;
          right: -10px;
          padding: 0;
  
          svg {
            width: 30px;
            fill: var(--color-delete);
          }
        `
      : ` `}
`;
