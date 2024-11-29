import React, { ReactNode } from "react";
import { MainContainer, MainWrapper } from "./style.ts";
import { useAuthStore } from "../../entities/auth";
import { RolesDict } from "../../shared/types";
import { Slider } from "../../shared/ui";
import Menu from "../Menu";

interface MainProps {
  children?: ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => {
  const { role } = useAuthStore();

  return (
    <MainContainer>
      <MainWrapper>
        <Slider $padding={20} $gap={30}>
          {children}
        </Slider>

        {role === RolesDict.USER ? <></> : <Menu />}
      </MainWrapper>
    </MainContainer>
  );
};

export default Main;
