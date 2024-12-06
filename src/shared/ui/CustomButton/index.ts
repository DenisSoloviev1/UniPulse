import styled from "styled-components";
import "../../variables.scss";

export const CustomButton = styled.button<{
  $style?: "gray" | "blue" | "close";
  $width?: string;
}>`
  display: flex;
  width: ${(props) => (props.$width ? `${props.$width}` : ``)};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 16px;
  transition: all 0.2s ease-in-out;
  gap: 15px;
  padding: 10px;

  ${(props) =>
    props.$style === "gray" &&
    `
      color: var(--color-font-active);
      background-color: var(--color-background);
      border: 2px solid var(--color-background-container);

      &:hover {
        background-color: var(--color-background-container);
      }
  `}

  ${(props) =>
    props.$style === "blue" &&
    `
      color: var(--color-background);
      background-color: var(--color-action);
      border: 2px solid var(--color-action);

      svg {
        fill: var(--color-background);
      }

      &:hover {
        background-color: #167ff6;
      }
  `}

  ${(props) =>
    props.$style === "close" &&
    `
      width: 30px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: var(--color-background);
      padding: 0;
      position: absolute;
      top: -10px;
      right: -10px;

      svg{
        fill: var(--color-delete);
        width: 25px;
        height: 25px;
      }
  `}
`;
