import styled from "styled-components";

export const Flex = styled.div<{
  $justify?: string;
  $align?: string;
  $direction?: string;
  $gap?: number;
}>`
  width: 100%;
  display: flex;
  flex-direction: ${(props) => props.$direction ?? "column"};
  justify-content: ${(props) => props.$justify ?? "flex-start"};
  align-items: ${(props) => props.$align ?? "start"};
  gap: ${(props) => (props.$gap ? `${props.$gap}px` : "5px")};
`;
