import React from "react";
import styled from "styled-components";
import "../../shared/Variables.scss";
import { NavBar } from "../NavBar";

export const MenuContainer = styled.div`
  position: fixed;
  left: 5%;
  bottom: 20px;
  width: 90%;
  display: none;
  justify-content: center;
  align-items: center;
  background-color: var(--color-background);
  padding: 15px;
  border-radius: 32px;
  box-shadow: 0 10px 20px 5px rgba(0, 0, 0, 0.3);

  @media screen and (max-width: 600px) {
    display: flex;
  }
`;
 const Menu: React.FC = () => {
  return (
    <MenuContainer>
      <NavBar />
    </MenuContainer>
  );
};

export default Menu;