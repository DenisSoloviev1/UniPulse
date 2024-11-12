import styled from "styled-components";
import "../../variables.scss";

export const PulseLoader = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;  
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: var(--color-action);

  &::after,
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    border: 2px solid var(--color-action);
    opacity: 0;
    border-radius: 50%;
    animation: pulse 1.5s linear infinite;
  }

  &::after {
    animation-delay: 0.7s; 
  }
}
`;

export const Message = styled.h2`
  font-size: 30px;
`;
