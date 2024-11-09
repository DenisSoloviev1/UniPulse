import React, { ReactNode } from "react";
import { MainContainer, MainWrapper, Slider } from "./style.ts";

interface MainProps {
  children?: ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => {
  return (
    <MainContainer>
      <MainWrapper>
        <Slider>{children}</Slider>
      </MainWrapper>
    </MainContainer>
  );
};

export default Main;
