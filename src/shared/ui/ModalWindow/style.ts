import styled from "styled-components";
import "../../variables.scss";

export const Modal = styled.div<{
  $show: boolean;
}>`
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  display: ${(props) => (props.$show ? "flex" : "none")};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(133, 132, 132, 0.2);
  backdrop-filter: blur(1px);
  z-index: 2;
`;

export const ModalContent = styled.div`
  height: 330px;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 16px;
  background-color: var(--color-background);
  padding: 10px 20px 20px;
  border: 1px solid var(--color-font-disable);
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.3);
  gap: 5px;
  position: relative;

  @media screen and (min-width: 600px) {
    width: 50%;
  }
  @media screen and (min-width: 1150px) {
    width: 30%;
  }
`;
