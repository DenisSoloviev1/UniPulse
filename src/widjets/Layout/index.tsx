import React, { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import {
  HeaderContainer,
  HeaderWrapper,
  MainContainer,
  MainWrapper,
} from "./style.ts";
import { Flex, Slider } from "../../shared/ui/index.ts";
import { Logo } from "../../shared/ui/Icon/index.tsx";
import { NavBar } from "../NavBar/index.tsx";
import { useAuthStore } from "../../entities/auth/index.ts";
import { RolesDict } from "../../shared/types/index.ts";
import Push from "../Push/";
import Menu from "../Menu/index.tsx";

interface LayoutProps {
  children?: ReactNode; // Добавлено свойство для `children`
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { role } = useAuthStore((state) => state);

  return (
    <>
      <HeaderContainer>
        <HeaderWrapper>
          <Logo />
          <Flex $direction={"row"} $align={"center"} $gap={20}>
            {role === RolesDict.MEDIA && <Push />}
            <NavBar />
          </Flex>
        </HeaderWrapper>
      </HeaderContainer>

      <MainContainer>
        <MainWrapper>
          <Slider $padding={20} $gap={30}>
            {children || <Outlet />} 
          </Slider>

          {role !== RolesDict.USER && <Menu />}
        </MainWrapper>
      </MainContainer>
    </>
  );
};

export default Layout;
