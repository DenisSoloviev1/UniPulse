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
  align-items: center;
  overflow-y: auto;
  gap: 20px;

  svg {
    max-width: 300px;
    max-height: 300px;
    z-index: 2;
  }

  h1,
  h2 {
    font-size: 20px;
  }

  p {
    font-size: 16px;
  }

  @media screen and (min-width: 1321px) {
    margin: 0 auto 20px;
    padding: 20px 40px;
  }

  @media screen and (min-width: 800px) {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  @media screen and (min-width: 500px) {
    svg {
      max-width: 500px;
      max-height: 500px;
    }

    h1,
    h2 {
      font-size: 30px;
    }

    p {
      font-size: 20px;
    }
  }
`;

export const Message = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  animation: slide-y 1.5s;

  svg {
    width: 40px;
    height: 40px;
    z-index: 0;
  }

  @media screen and (min-width: 800px) {
    animation: slide-x 1.5s;
  }
`;

export const SocialWeb = styled.a`
  width: 128px;
  height: 128px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  background-color: var(--color-background-container);
  overflow: hidden; /* Скрывает выходящий за границы контент */
  position: relative; /* Для управления внутренними элементами */

  &::before {
    content: "";
    width: 200px;
    height: 200px;
    border-radius: 50%;
    position: absolute;
    inset: 0;
    background: linear-gradient(238.27deg, #11519c -4.32%, #288ad8 91.02%);
    transform: translate(-100%, 100%);
    transition: transform 0.5s ease-in-out;
    z-index: 0; /* Поместить градиент под содержимым */
  }

  svg {
    width: 78px;
    height: 78px;
    fill: var(--color-font-disable);
    transition: fill 0.5s ease-in-out;
    z-index: 1; /* Содержимое поверх градиента */
  }

  &:hover::before {
    transform: translate(-10%, -20%); /* Показываем градиент */
  }

  &:hover svg {
    fill: var(--color-background);
  }
`;
