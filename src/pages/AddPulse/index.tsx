import React from "react";
import Header from "../../widjets/Header";
import Main from "../../widjets/Main";
import CreatNotif from "../../widjets/CreatNotif";
import { PulseList } from "../../entities/notification";

export const AddPulse: React.FC = () => {
  return (
    <>
      <Header />
      <Main>
        <CreatNotif />

        <PulseList title={"Отправленные пульсы"} />
      </Main>
    </>
  );
};
