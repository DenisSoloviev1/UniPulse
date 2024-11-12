import React, { ReactNode } from "react";
import { MainContainer, MainWrapper } from "./style.ts";
import { Slider } from "../../shared/ui";

interface MainProps {
  children?: ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => {
  return (
    <MainContainer>
      <MainWrapper>
        <Slider $padding={20} $gap={30}>{children}</Slider>
      </MainWrapper>
    </MainContainer>
  );
};

export default Main;
