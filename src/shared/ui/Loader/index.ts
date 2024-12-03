import styled from "styled-components";
import "../../variables.scss";

export const Loader = styled.div<{
  $size?: string;
  $border?: string;
  $color?: "blue" | "white";
}>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.$size || "auto"};
  height: ${(props) => props.$size || "auto"};

  &::before,
  &::after {
    position: absolute;
    content: "";
    height: 100%;
    width: 100%;
    border: ${(props) => props.$border || "8px"} solid
      ${(props) => props.$color === "white"? `var(--color-background)`:`var(--color-action`};
    border-radius: 50%;
    animation: pulse 2s linear infinite;
  }

  &::after {
    opacity: 0;
    animation-delay: 1s;
  }
`;
