import React from "react";
import { HeaderContainer, HeaderWrapper } from "./style.ts";
import { Logo } from "../../shared/ui/Icon";
import { NavBar } from "../NavBar";
import { Bell, Flex } from "../../shared/ui";
import Push from "../../widjets/Push";

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <HeaderWrapper>
        <Logo />

        <Flex $direction={"row"} $align={"center"} $gap={10}>
          <Bell />
          <Push />

          <NavBar />
        </Flex>
      </HeaderWrapper>
    </HeaderContainer>
  );
};
export default Header;
