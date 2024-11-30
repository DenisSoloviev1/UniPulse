import styled from "styled-components";
import "../../shared/Variables.scss";

export const BellButton = styled.button`
  transition: all 0.2s ease-in-out;
  position: relative;

  svg {
    width: 30px;
    height: 30px;
    fill: var(--color-action);
  }
  &:hover {
    cursor: pointer;
    animation: bounce 0.3s;
  }
`;

export const Circle = styled.div`
  position: absolute;
  top: 2px;
  right: -2px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15px;
  height: 15px;
  font-size: 11px;
  border-radius: 50%;
  background-color: var(--color-delete);
  color: var(--color-background);
`;
