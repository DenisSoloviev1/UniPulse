import React from "react";
import { HeaderContainer, HeaderWrapper } from "./style.ts";
import { Logo } from "../../shared/ui/Icon";
import { NavBar } from "../NavBar";
import Push from "../../widjets/Push";

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <HeaderWrapper>
        <Logo />

        <Push />

        <NavBar />
      </HeaderWrapper>
    </HeaderContainer>
  );
};
export default Header;
