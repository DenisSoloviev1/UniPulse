import styled from "styled-components";
import "../../variables.scss";

export const Modal = styled.div<{ $background?: boolean }>`
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  z-index: 2;

  ${(props) =>
    props.$background
      ? `
    background-color: rgba(133, 132, 132, 0.2);
    backdrop-filter: blur(1px);
    justify-content: center;
    align-items: center;
  `
      : `
    background-color: transparent;
  `}
`;

export const ModalContent = styled.div<{ $width?: string; $height?: string }>`
  max-width: 450px;
  width: ${(props) => (props.$width ? props.$width : `80%`)};
  height: ${(props) => (props.$height ? props.$height : `330px`)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  background-color: var(--color-background);
  padding: 10px 20px 20px;
  border: 1px solid var(--color-font-disable);
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.3);
  position: relative;
  gap: 10px;
`;
