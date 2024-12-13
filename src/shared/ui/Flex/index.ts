import styled from "styled-components";

export const Flex = styled.div<{
  $justify?: string;
  $align?: string;
  $direction?: string;
  $gap?: number;
  $shadow?: boolean;
  $wrap?: boolean;
  $width?: string;
  $height?: string;
  $position?: string;
}>`
  width: ${(props) => props.$width ?? ""};
  height: ${(props) => props.$height ?? ""};
  display: flex;
  flex-direction: ${(props) => props.$direction ?? "column"};
  justify-content: ${(props) => props.$justify ?? "flex-start"};
  align-items: ${(props) => props.$align ?? "start"};
  gap: ${(props) => (props.$gap ? `${props.$gap}px` : "5px")};
  ${(props) => props.$shadow && `box-shadow: 0 3px 3px rgba(0, 0, 0, 0.3);`}
  flex-wrap: ${(props) => props.$wrap && `wrap`};
`;
