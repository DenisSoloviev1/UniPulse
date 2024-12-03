import styled from "styled-components";
import "../../variables.scss";

export const Skeleton = styled.div<{ $width?: string; $height?: string }>`
  background-color: var(--color-background-container); /* Цвет скелетона */
  border-radius: 16px; 
  width: ${({ $width }) => $width || "100%"};
  height: ${({ $height }) => $height || "40px"};
  animation: shimmer 2s infinite linear;

  @keyframes shimmer {
    0% {
      background-position: 100% 0;
    }
    95% {
      background-position: -100% 0;
    }
    100% {
      background-position: -100% 0;
    }
  }

  background: linear-gradient(90deg, #e0e0e0 25%, #faf8f8 50%, #e0e0e0 75%);
  background-size: 200% 100%;
`;
