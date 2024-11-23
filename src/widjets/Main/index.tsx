import React, { ReactNode } from "react";
import { MainContainer, MainWrapper } from "./style.ts";
import { Slider } from "../../shared/ui";
import { Menu } from "../Menu/index.tsx";

interface MainProps {
  children?: ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => {
  return (
    <MainContainer>
      <MainWrapper>
        <Slider $padding={20} $gap={30}>{children}</Slider>
        <Menu/>
      </MainWrapper>
    </MainContainer>
  );
};

export default Main;
