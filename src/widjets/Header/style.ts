import styled from "styled-components";
import "../../shared/variables.scss";

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
  padding: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: var(--color-background);
  border: 2px solid var(--color-background-container);


  @media screen and (min-width: 1321px) {
    margin: 20px auto 0;
    border-radius: 30px 30px 0 0;
    padding: 20px 30px;
  }
`;
