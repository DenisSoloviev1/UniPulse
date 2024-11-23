import styled from "styled-components";
import "../../variables.scss";

export const CustomButton = styled.button<{
  $style?: "gray" | "blue";
  $width?: string;
}>`
  display: flex;
  width: ${(props) => (props.$width ? `${props.$width}` : ``)};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 16px;
  transition: all 0.3s ease-in-out;
  gap: 15px;
  padding: 10px;

  ${(props) =>
    props.$style === "gray" &&
    `
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
`;
