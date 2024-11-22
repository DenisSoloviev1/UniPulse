import styled from "styled-components";
import "../shared/variables.scss";

export const Wrapper = styled.div`
  margin: 0 auto;
  width: 100vw;
  max-width: 1320px;
  min-height: 100vh;
  padding: 20px 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  overflow-y: auto;
  gap: 40px;

  svg {
    max-width: 40%;
    z-index: 1;
  }

  h1,
  h2 {
    font-size: 30px;
  }

  p {
    font-size: 20px;
  }

  @media screen and (min-width: 1321px) {
    margin: 0 auto 20px;
    padding: 20px 40px;
  }
`;

export const Message = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 50px;
  gap: 10px;
  animation: slide-x 1s ease-in-out;

  button:hover {
    svg {
      fill: var(--color-action);
    }
  }

  svg {
    width: 40px;
    height: 40px;
    z-index: 0;
  }
`;
