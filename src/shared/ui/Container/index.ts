import styled from "styled-components";

export const Container = styled.div<{
  $active?: boolean;
  $color?: string;
  $border?: number;
  $gap?: number;
  $padding?: number;
}>`
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${(props) =>
    props.$color === "light"
      ? `var(--color-background)`
      : `var(--color-background-container)`};
  border-radius: ${(props) => (props.$border ? `${props.$border}px` : "8px")};
  gap: ${(props) => (props.$gap ? `${props.$gap}px` : "5px")};
  padding: ${(props) => (props.$padding ? `${props.$padding}px` : "10px 15px")};
  transition: all 0.3s ease-in-out;
  position: relative;

  &:hover {
    ${(props) => props.$active && `cursor: pointer; background-color: #dfdfdf;`}
  }

  p {
    position: relative;
    top: -2px;
  }

  svg {
    width: 20px;
  }

  input {
    width: 100%;
  }
`;
