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
  overflow-x: hidden;

  @media screen and (min-width: 1321px) {
    width: 50%;
    height: 60vh;
    top: 72px;
    border: 2px solid var(--color-background-container);
    border-top: 0;
    border-radius: 0 0 30px 30px;
  }
`;

export const Head = styled.div`
  width: 100%;
  text-align: center;
  position: relative;
  padding: 5px 15px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
z-index: 2;

  h4 {
    font-size: 20px;
  }
  button {
    position: absolute;
    left: 15px;
    width: 30px;
  }
  svg {
    fill: var(--color-action);
  }
`;
