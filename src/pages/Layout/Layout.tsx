import { ReactNode } from "react";
import Header from "../../widjets/Header";
import Main from "../../widjets/Main";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <Main>{children}</Main>
    </>
  );
};

// Компонент нужно дописать и убрать из pages header и main
