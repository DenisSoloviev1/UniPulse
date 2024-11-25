import React from "react";
import { HeaderContainer, HeaderWrapper } from "./style.ts";
import { useAuthStore } from "../../entities/auth";
import { RolesDict } from "../../shared/types";
import { Logo } from "../../shared/ui/Icon";
import { NavBar } from "../NavBar";
import { Bell, Flex } from "../../shared/ui";
import Push from "../Push";

const Header: React.FC = () => {
  const { role } = useAuthStore((state) => state);

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <Logo />

        <Flex $direction={"row"} $align={"center"} $gap={20}>
          {role !== RolesDict.USER && <Bell />}
          <Push />

          <NavBar />
        </Flex>
      </HeaderWrapper>
    </HeaderContainer>
  );
};
export default Header;
