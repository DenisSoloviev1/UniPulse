import styled from "styled-components";
import "../../variables.scss";

export const Modal = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
  background-color: rgba(133, 132, 132, 0.3);
`;

export const ModalContent = styled.div<{
  $width?: string;
  $height?: string;
  $position?: string[];
}>`
  width: ${(props) => (props.$width ? props.$width : `450px`)};
  height: ${(props) => (props.$height ? props.$height : `370px`)};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  border-radius: 16px;
  background-color: var(--color-background);
  padding: 20px;
  border: 1px solid var(--color-font-disable);
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.3);
  position: ${(props) => (props.$position ? `absolute` : `relative`)};
  z-index: 4;

  ${(props) => {
    const [top, left, bottom, right] = props.$position || [];
    return `
      ${top ? `top: ${top};` : ""}
      ${left ? `left: ${left};` : ""}
      ${bottom ? `bottom: ${bottom};` : ""}
      ${right ? `right: ${right};` : ""}
    `;
  }}

  @media screen and (max-width: 551px) {
  width: ${(props) => (props.$width ? props.$width : `90%`)};
  }
`;
