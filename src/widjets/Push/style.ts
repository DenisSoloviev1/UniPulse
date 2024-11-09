import styled from "styled-components";
import "../../shared/variables.scss";

export const PushContainer = styled.div<{
  $show?: boolean;
}>`
  width: 100%;
  height: 80vh;
  ${(props) =>
    props.$show
      ? `display: flex;
  animation: slide-y 0.2s ease-in-out;`
      : `display: none;`}
  flex-direction: column;
  position: absolute;
  top: 65px;
  right: 0;
  background-color: var(--color-background);
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.3);
  gap: 15px;
  padding: 5px 10px;
  overflow-x: hidden;

  h4 {
    font-size: 20px;
  }
  button {
    position: absolute;
    left: 0;
    width: 30px;
  }
  svg {
    fill: var(--color-action);
  }

  @media screen and (min-width: 1321px) {
    width: 50%;
    height: 60vh;
    top: 72px;
    border: 2px solid var(--color-background-container);
    border-top: 0;
    border-radius: 0 0 30px 30px;
    padding: 10px 20px;
  }
`;
