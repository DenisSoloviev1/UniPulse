import styled from "styled-components";

export const HeaderContainer = styled.header`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  position: relative;
`;

export const HeaderWrapper = styled.div`
  position: relative;
  margin: 0 auto;
  width: 100%;
  min-width: 320px;
  max-width: 1320px;
  padding: 10px 30px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-background);
  border: 2px solid var(--color-background-container);

  @media screen and (max-width: 601px) {
    a {
      display: none;
    }

    a[data-id="2"] {
      display: flex;
    }
  }

  @media screen and (min-width: 1321px) {
    border-radius: 30px 30px 0 0;
    padding: 20px 30px;
  }
`;


export const MainContainer = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  ::-webkit-scrollbar {
    width: 3px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--color-action);
    border-radius: 10px;
  }
`;

export const MainWrapper = styled.div`
  margin: 0 auto;
  padding-bottom: 70px;
  width: 100%;
  min-width: 320px;
  max-width: 1320px;
  min-height: 100vh;
  background-color: var(--color-background);
  border: 2px solid var(--color-background-container);
  border-top: 0;
  overflow-x: hidden;

  @media screen and (min-width: 1321px) {
    border-radius: 0 0 30px 30px;
    padding-bottom: 0;
  }
`;
