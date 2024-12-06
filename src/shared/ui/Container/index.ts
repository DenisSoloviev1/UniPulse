import styled from "styled-components";
import "../../Variables.scss";

export const Container = styled.div<{
  $width?: string;
  $style?: "noAction" | "normal" | "light" | "choice";
  $border?: number;
  $gap?: number;
  $padding?: number | number[];
  $noActive?: boolean;
}>`
  width: ${(props) => props.$width};
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: var(--color-background-container);
  border: 2px solid transparent;
  border-radius: ${(props) => (props.$border ? `${props.$border}px` : "8px")};
  gap: ${(props) => (props.$gap ? `${props.$gap}px` : "5px")};
  padding: ${(props) => {
    if (Array.isArray(props.$padding)) {
      const [top, right = top, bottom = top, left = right] = props.$padding;
      return `${top}px ${right}px ${bottom}px ${left}px`;
    }
    return `${props.$padding || 10}px ${props.$padding || 15}px`;
  }};
  transition: all 0.3s ease-in-out;
  position: relative;

  ${(props) =>
    props.$noActive
      ? `
      cursor: not-allowed;
  
      label {
        cursor: not-allowed;
        opacity: 0.5;
      }
  
      input {
        cursor: not-allowed;
        opacity: 0.5;
        pointer-events: none;
      }

      &:hover {
        opacity: 0.5;
        background-color: var(--color-background-container);
      } 
    `
      : `
    &:hover {
    cursor: pointer;
    background-color: #dfdfdf;
  }`};

  svg {
    width: 25px;
  }

  input {
    width: 100%;
  }

  ${(props) =>
    props.$style === "normal"
      ? `
  background-color: var(--color-background-container);

  &:hover {
    cursor: pointer;
    background-color: #dfdfdf;
  }
  `
      : ""}

  ${(props) =>
    props.$style === "light"
      ? `
  background-color: var(--color-background);

  &:hover {
    background-color: var(--color-background);
  }
  `
      : ""}

  ${(props) =>
    props.$style === "choice"
      ? `
      border: 2px solid var(--color-action);
      `
      : ""}

  ${(props) =>
    props.$style === "noAction"
      ? `
    background-color: var(--color-background-container);

    &:hover {
      cursor: default;
      background-color: var(--color-background-container);
    }      
    `
      : ""}
`;
