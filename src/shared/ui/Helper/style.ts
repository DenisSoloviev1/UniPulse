import styled from "styled-components";

interface HelperContainerProps {
  $width?: string;
  $height?: string;
}

export const HelperContainer = styled.div<HelperContainerProps>`
  width: ${(props) => props.$width || "300px"};
  height: ${(props) => props.$height || "auto"};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  padding: 20px;
  background-color: var(--color-background);
  border: 1px solid var(--color-font-disable);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  position: relative;
`;
