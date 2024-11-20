import styled from "styled-components";
import "../../../shared/variables.scss";

export const Title = styled.h4`
  font-size: 20px;
  font-weight: 700;
`;
export const Text = styled.p`
  width: 100%;
  font-size: 20px;
  padding-left: 10px;

  @media screen and (min-width: 1321px) {
    width: 100%;
    font-size: 20px;
    padding-left: 30px;
  }
`;
export const Toggle = styled.span`
  color: var(--color-action);
  cursor: pointer;
  margin-left: 2px;

  svg {
    fill: var(--color-action);
    position: relative;
    top: 5px;
  }
`;
