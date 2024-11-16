import styled from "styled-components";
import "../../variables.scss";

// export const PulseLoader = styled.div`
//   position: relative;
//   width: 100px;
//   height: 100px;
//   border-radius: 50%;
//   background-color: var(--color-action);

//   &::after,
//   &::before {
//     content: "";
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     width: 100%;
//     height: 100%;
//     border: 2px solid var(--color-action);
//     opacity: 0;
//     border-radius: 50%;
//     animation: pulse 1.5s linear infinite;
//   }

//   &::after {
//     animation-delay: 0.7s; 
//   }
// }
// `;


export const Loader = styled.div<{ $size?: string }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.$size || "auto"};
  height: ${(props) => props.$size || "auto"};

  &::before,
  &::after {
    position: absolute;
    content: "";
    height: 100%;
    width: 100%;
    border: 8px solid var(--color-action);
    border-radius: 50%;
    animation: pulse 2s linear infinite;
  }

  &::after {
    opacity: 0;
    animation-delay: 1s;
  }
`;
