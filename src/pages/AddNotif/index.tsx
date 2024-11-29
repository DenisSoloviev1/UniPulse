import React from "react";
import Header from "../../widjets/Header";
import Main from "../../widjets/Main";
import ManageNotif from "../../widjets/ManageNotif";
import { NotifList } from "../../entities/notification";

export const AddNotif: React.FC = () => {
  return (
    <>
      <Header />
      <Main>
        <ManageNotif/>

        <NotifList title={"Отправленные пульсы"} />
      </Main>
    </>
  );
};
