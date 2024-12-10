import styled from "styled-components";
import "../../../shared/variables.scss";

export const Slider = styled.div<{
  $padding?: number;
  $gap?: number;
  $height?: number | null;
  $wrap?: boolean;
}>`
  display: flex;
  ${(props) =>
    props.$wrap
      ? `flex-wrap: wrap;   
    `
      : `flex-direction: column;`}
  align-items: flex-start;

  width: 100%;
  min-height: 100px;
  height: ${(props) => (props.$height ? `${props.$height}px` : `auto`)};
  overflow-y: scroll;
  overflow-x: hidden;
  gap: ${(props) => (props.$gap ? `${props.$gap}px` : "5px")};
  padding: ${(props) => (props.$padding ? `${props.$padding}px` : ``)};

  &::-webkit-scrollbar {
    width: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--color-action);
  }
`;
